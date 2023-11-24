<?php

namespace App\Controller\api;

use App\Entity\Need;
use App\Entity\Student;
use App\Repository\NeedRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api/student')]
class StudentController extends AbstractController
{
    #[Route('/{id}/need', name: 'app_student_need_add', methods: ['GET', 'POST'])]
    public function addNedd(
        Request $request,
        Student $student,
        EntityManagerInterface $entityManager,
        NeedRepository $needRepository
    ): JsonResponse
    {
        //Student with $id add some need
        $data = json_decode($request->getContent(), true);

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
        $entityManager->flush();

        return new JsonResponse(['message' => 'Need removed'], Response::HTTP_NO_CONTENT);
    }


}
