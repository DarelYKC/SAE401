<?php

namespace App\Controller;

use App\Entity\StatistiqueLogement;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

final class StatistiqueController extends AbstractController
{
    public function logement (EntityManagerInterface $entityManager): Response
    {
        $statistiques = $entityManager->getRepository(StatistiqueLogement::class)->findAll();

        return $this->json($statistiques, 200, [], [
            'groups' => 'logement',
        ]);
    }

    public function departement (EntityManagerInterface $entityManager): Response
    {
        $statistiques = $entityManager->getRepository(StatistiqueLogement::class)->findAll();

        return $this->json($statistiques, 200, [], [
            'groups' => 'departement',
        ]);
    }

    public function region (EntityManagerInterface $entityManager): Response
    {
        $statistiques = $entityManager->getRepository(StatistiqueLogement::class)->findAll();

        return $this->json($statistiques, 200, [], [
            'groups' => 'region',
        ]);
    }
}
