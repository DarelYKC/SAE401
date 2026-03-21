<?php

namespace App\Entity;

use App\Repository\StatistiqueLogementRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Entity\Departement;
use App\Entity\Region;

#[ORM\Entity(repositoryClass: StatistiqueLogementRepository::class)]
class StatistiqueLogement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $annee_publication = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $taux_de_chomage = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $taux_de_pauvrete = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nombreLogement = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nombreHabitant = null;

    #[ORM\ManyToOne(inversedBy: 'statistiqueLogements')]
    #[ORM\JoinColumn(name: 'departement_code', referencedColumnName: 'code')]
    #[Groups(['logement'])]
    private ?Departement $departement = null;

    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getAnneePublication(): ?int
    {
        return $this->annee_publication;
    }
    
    public function setAnneePublication(int $annee_publication): static
    {
        $this->annee_publication = $annee_publication;

        return $this;
    }

    public function getTauxDeChomage(): ?float
    {
        return $this->taux_de_chomage;
    }

    public function setTauxDeChomage(?float $taux_de_chomage): static
    {
        $this->taux_de_chomage = $taux_de_chomage;

        return $this;
    }

    public function getTauxDePauvrete(): ?float
    {
        return $this->taux_de_pauvrete;
    }

    public function setTauxDePauvrete(?float $taux_de_pauvrete): static
    {
        $this->taux_de_pauvrete = $taux_de_pauvrete;

        return $this;
    }

    public function getNombreLogement(): ?int
    {
        return $this->nombreLogement;
    }

    public function setNombreLogement(?int $nombreLogement): static
    {
        $this->nombreLogement = $nombreLogement;

        return $this;
    }

    public function getNombreHabitant(): ?int
    {
        return $this->nombreHabitant;
    }

    public function setNombreHabitant(?int $nombreHabitant): static
    {
        $this->nombreHabitant = $nombreHabitant;

        return $this;
    }

        public function getDepartement(): ?Departement
    {
        return $this->departement;
    }

    public function setDepartement(?Departement $departement): static
    {
        $this->departement = $departement;

        return $this;
    }
}
