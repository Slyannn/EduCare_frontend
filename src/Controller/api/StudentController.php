<?php

namespace App\Controller\api;

use App\Entity\Address;
use App\Entity\Need;
use App\Entity\Organism;
use App\Entity\OrganismAdmin;
use App\Entity\Student;
use App\Entity\User;
use App\Repository\NeedRepository;
use App\Repository\OrganismAdminRepository;
use App\Service\SignupUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use function Sodium\add;

#[Route('/api/student')]
class StudentController extends AbstractController
{


    /**
     * @throws \JsonException
     */
    #[Route('/signup', name: 'app_student_signup', methods: ['GET', 'POST'])]
    public function signup(
        Request $request,
        UserPasswordHasherInterface $orgPasswordHasher,
        EntityManagerInterface      $entityManager): JsonResponse
    {
        //Extract data from the request
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        //New student
        $student = new Student();
        //Set student data
        $student->setFirstname($data['firstname']);
        $student->setLastname($data['lastname']);
        $student->setUniversity($data['university']);

        //New address
        $address = new Address();
        $org = new User();
        return (new SignupUser())->signupUser($data, $student, 'ROLE_STUDENT', $org, $address, $entityManager, $orgPasswordHasher);
    }

    //get Student by email
    #[Route('/{email}', name: 'app_student_get', requirements: ['email' => '\S+@\S+\.\S+'], methods: ['GET'])]
    public function getStudent(string $email, EntityManagerInterface $entityManager): JsonResponse
    {
        $org = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$org) {
            return new JsonResponse(['message' => 'Student not found'], Response::HTTP_NOT_FOUND);
        }
        //dataProvider
        /** @var User $org */
        $org = [
            'id' => $org->getId(),
            'email' => $org->getEmail(),
            'roles' => $org->getRoles(),
            'password' => $org->getPassword(),
            'address' => [
                'id' => $org->getAddress()?->getId(),
                'street' => $org->getAddress()?->getStreet(),
                'city' => $org->getAddress()?->getCity(),
                'zipCode' => $org->getAddress()?->getZipCode(),
                'country' => $org->getAddress()?->getCountry(),
            ],
            'student' => [
                'id' => $org->getStudent()?->getId(),
                'firstname' => $org->getStudent()?->getFirstname(),
                'lastname' => $org->getStudent()?->getLastname(),
                'university' => $org->getStudent()?->getUniversity(),
                'enable' => $org->getStudent()?->isEnable(),
                'createdAt' =>$org->getStudent()?->getCreateAt(),
                'needs' => array_map(function ($need) {
                    return [
                        'id' => $need->getId(),
                        'name' => $need->getName(),
                    ];
                }, $org->getStudent()?->getNeeds()->toArray())
            ],

        ];
        return new JsonResponse($org, Response::HTTP_OK);
    }

    /**
     * @throws \JsonException
     */
    #[Route('/{id}/need', name: 'app_student_need_add', methods: ['GET', 'POST'])]
    public function addNedd(
        Request $request,
        Student $student,
        EntityManagerInterface $entityManager,
        NeedRepository $needRepository
    ): JsonResponse
    {
        //Student with $id add some need
        $data = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);

        /** @var Need $need */
        $need = $needRepository->find($data['need']['id']);

        $student->addNeed($need);
        $need->addStudent($student);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Need added'], Response::HTTP_CREATED);
    }

    //remove need
    #[Route('/{id}/need/{need}', name: 'app_student_need_remove', methods: ['DELETE'])]
    public function removeNeed(
        Student $student,
        Need $need,
        EntityManagerInterface $entityManager
    ): JsonResponse
    {
        $student->removeNeed($need);
        $need->removeStudent($student);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Need removed'], Response::HTTP_NO_CONTENT);
    }

    //shows all organism by needs
    #[Route('/{id}/organisms', name: 'app_student_show_organism', methods: ['GET'])]
    public function showOrganismByNeed(
        Student $student,
        EntityManagerInterface $entityManager,
        OrganismAdminRepository $organismAdminRepository
    ): JsonResponse
    {
        $organismList = [];

       foreach ($student->getNeeds() as $need){
           foreach($need->getOrganisms() as $org){
               $organismList[] = [
                   'id' => $org->getId(),
                   'name' => $org->getName(),
                   'description' => $org->getDescription(),
                   'logo' => $org->getLogo(),
                   'certificate' => $org->getCertificate(),
                   'services' => array_map(static function ($service) {
                       return [
                           'id' => $service->getId(),
                           'name' => $service->getName(),
                       ];
                   }, $org->getServices()->toArray()),
                   'user' => [
                       'id' => $org->getUser()?->getId(),
                       'email' => $org->getUser()?->getEmail(),
                       'address' => [
                           'id' => $org->getUser()?->getAddress()?->getId(),
                           'street' => $org->getUser()?->getAddress()?->getStreet(),
                           'city' => $org->getUser()?->getAddress()?->getCity(),
                           'zipCode' => $org->getUser()?->getAddress()?->getZipCode(),
                           'country' => $org->getUser()?->getAddress()?->getCountry(),
                       ],
                   ],
               ];
           }

           foreach ($need->getOrganismAdmins() as $organismAdmin){
               $organismList[] = [
                   'id' => $organismAdmin->getId(),
                   'name' => $organismAdmin->getName(),
                   'description' => $organismAdmin->getDescription(),
                   'logo' => $organismAdmin->getLogo(),
                   'services' => array_map(static function ($service) {
                       return [
                           'id' => $service->getId(),
                           'name' => $service->getName(),
                       ];
                   }, $organismAdmin->getServices()->toArray()),
                   'address' => [
                       'id' => $organismAdmin->getAddress()?->getId(),
                       'street' => $organismAdmin->getAddress()?->getStreet(),
                       'city' => $organismAdmin->getAddress()?->getCity(),
                       'zipCode' => $organismAdmin->getAddress()?->getZipCode(),
                       'country' => $organismAdmin->getAddress()?->getCountry(),
                   ],
               ];
           }
       }



       //give list of organism
        return new JsonResponse($organismList, Response::HTTP_OK);
    }






}
