<?php

namespace App\Controller;

use App\Entity\StatistiqueLogement;
use App\Entity\Departement;
use App\Entity\Region;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class StatistiqueController extends AbstractController
{
    // Chemin d'accès pour l'API : /api/statistiques
        #[Route('/api/statistiques', name: 'api_statistiques', methods: ['GET'])]
    public function statistiques(StatistiqueLogementRepository $repo): JsonResponse
    {
        $data = $repo->findAll();
        return $this->json($data);
    }

    //faire ceci pour récupérer les données dans le React

        //     fetch('http://localhost:8000/api/statistiques')
        //   .then(res => res.json())
        //   .then(data => setStats(data))
        //   .catch(err => console.error(err));

    public function logement (EntityManagerInterface $entityManager): Response
    {
        $statistiques = $entityManager->getRepository(StatistiqueLogement::class)->findAll();

        return $this->json($statistiques, 200, [], [
            'groups' => 'logement',
        ]);
    }

    public function departement (EntityManagerInterface $entityManager): Response
    {
        $departement = $entityManager->getRepository(Departement::class)->findAll();

        return $this->json($departement, 200, [], [
            'groups' => 'departement',
        ]);
    }

    public function region (EntityManagerInterface $entityManager): Response
    {
        $region = $entityManager->getRepository(Region::class)->findAll();

        return $this->json($region, 200, [], [
            'groups' => 'region',
        ]);
    }
}
