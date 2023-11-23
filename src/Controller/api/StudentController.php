<?php

namespace App\Controller\api;

use App\Entity\Address;
use App\Entity\Student;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/student')]
class StudentController extends AbstractController
{

    public function __construct()
    {
    }

    #[Route('/signup', name: 'app_student-signup', methods: ['GET', 'POST'])]
    public function signup(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        //Extract data from the request
        $data = json_decode($request->getContent(), true);
        //New student
        $student = new Student();
        //Set student data
        $student->setFirstname($data['firstname']);
        $student->setLastname($data['lastname']);
        $student->setUniversity($data['university']);
        $student->setEmail($data['email']);
        $student->setPassword($userPasswordHasher->hashPassword($student, $data['password']));
        $student->setRoles(['ROLE_STUDENT']);

        //New address
        $address = new Address();
        //Set address data
        $address->setStreet($data['address']['street']);
        $address->setCity($data['address']['city']);
        $address->setZipCode($data['address']['zipCode']);
        $address->setCountry($data['address']['country']);
        //$address->addStudent($student);

        $existingStudent = $entityManager->getRepository(Student::class)->findOneBy(['email' => $student->getEmail()]);

        if ($existingStudent) {
            return new JsonResponse(['message' => 'Email is already registered'], JsonResponse::HTTP_CONFLICT);
        }

        //save address
        $entityManager->persist($address);
        $entityManager->flush();

        $student->setAddress($address);


        //Save student
        $entityManager->persist($student);

        $entityManager->flush();

        return new JsonResponse(['message' => 'Student registered successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/login', name: 'app_student-login', methods: ['OPTIONS', 'GET', 'POST'])]
    public function login(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager
    ): JsonResponse {
        //Extract data from the request
        $data = json_decode($request->getContent(), true);
        //New student
        $student = new Student();
        //Set student data
        $student->setEmail($data['email']);
        $student->setPassword($userPasswordHasher->hashPassword($student, $data['password']));
        $existingStudent = $entityManager->getRepository(Student::class)->findOneBy(['email' => $student->getEmail()]);
        if (!$existingStudent) {
            return new JsonResponse(['message' => 'Email is not registered'], JsonResponse::HTTP_CONFLICT);
        }
        if ($userPasswordHasher->isPasswordValid($existingStudent, $data['password'])) {
            //serialize and give the student data
            $responseData = [
                'id' => $existingStudent->getId(),
                'email' => $existingStudent->getEmail(),
                'firstname' => $existingStudent->getFirstname(),
                'lastname' => $existingStudent->getLastname(),
                'university' => $existingStudent->getUniversity(),
                'password' => $existingStudent->getPassword(),
                'enable' => $existingStudent->isEnable(),
                'address' => [
                        'street' => $existingStudent->getAddress()->getStreet(),
                        'city' => $existingStudent->getAddress()->getCity(),
                        'zipCode' => $existingStudent->getAddress()->getZipCode(),
                        'country' => $existingStudent->getAddress()->getCountry(),
                    ]
            ];

            //return message and user data json_code
            return new JsonResponse(['message' => 'Login successful', 'user' => $responseData], JsonResponse::HTTP_OK);
        }
        return new JsonResponse(['message' => 'Invalid credentials'], JsonResponse::HTTP_CONFLICT);
    }

}