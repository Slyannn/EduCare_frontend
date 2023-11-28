<?php

namespace App\Controller\admin;

use App\Entity\Organism;
use App\Entity\OrganismAdmin;
use App\Form\OrganismAdminType;
use App\Repository\AddressRepository;
use App\Repository\OrganismAdminRepository;
use App\Repository\OrganismRepository;
use App\Service\UploadFile;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

#[Route('/admin/organism')]
class OrganismAdminController extends AbstractController
{
    /**
     * @param UploadFile $uploadFile
     */
    public function __construct(
        private UploadFile $uploadFile
    )
    {

    }



    #[Route('/', name: 'app_organism_admin_index', methods: ['GET'])]
    public function index(
        OrganismAdminRepository $organismAdminRepository): Response
    {
        return $this->render('organism_admin/index.html.twig', [
            'organism_admins' => $organismAdminRepository->findAll(),
        ]);
    }

    #[Route('/profile', name: 'app_organism_profile_index', methods: ['GET'])]
    public function profileList(
        OrganismRepository $organismRepository): Response
    {
        return $this->render('organism_admin/organism_profile.html.twig', [
            'organisms' => $organismRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_organism_admin_new', methods: ['GET', 'POST'])]
    public function new(Request $request,
                        EntityManagerInterface $entityManager,
                        SluggerInterface $slugger): Response
    {
        $organismAdmin = new OrganismAdmin();
        $form = $this->createForm(OrganismAdminType::class, $organismAdmin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if ($form['logo']->getData()) {
                $uploadedFile = $form['logo']->getData();
                $newFilename = $this->uploadFile->uploadedFilename($uploadedFile, $slugger);
                $organismAdmin->setLogo($newFilename);
            }

            $entityManager->persist($organismAdmin->getAddress());
            $entityManager->persist($organismAdmin);
            $entityManager->flush();

            return $this->redirectToRoute('app_organism_admin_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('organism_admin/new.html.twig', [
            'organism_admin' => $organismAdmin,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_organism_admin_show', methods: ['GET'])]
    public function show(OrganismAdmin $organismAdmin): Response
    {
        return $this->render('organism_admin/show.html.twig', [
            'organism_admin' => $organismAdmin,
        ]);
    }

    #[Route('/profile/{id}', name: 'app_organism_profile_show', methods: ['GET'])]
    public function showProfile(Organism $organism): Response
    {
        return $this->render('organism_admin/showOrganism.html.twig', [
            'organism' => $organism,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_organism_admin_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, OrganismAdmin $organismAdmin, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(OrganismAdminType::class, $organismAdmin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_organism_admin_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('organism_admin/edit.html.twig', [
            'organism_admin' => $organismAdmin,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_organism_admin_delete', methods: ['POST'])]
    public function delete(Request $request, OrganismAdmin $organismAdmin, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$organismAdmin->getId(), $request->request->get('_token'))) {
            $entityManager->remove($organismAdmin);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_organism_admin_index', [], Response::HTTP_SEE_OTHER);
    }
}
