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

    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?float $construction = null;

    #[ORM\Column]
    #[Groups(['logement', 'departement', 'region'])]
    private ?int $nombreLogement = null;

    #[ORM\ManyToOne(inversedBy: 'statistiqueLogements')]
    #[ORM\JoinColumn(name: 'departement_code', referencedColumnName: 'code')]
    #[Groups(['logement'])]
    private ?Departement $departement = null;

    #[ORM\Column]
    private ?int $année_publication = null;

    #[ORM\Column]
    private ?int $Nombredhabitants = null;

    #[ORM\Column]
    private ?float $Densité_de_population_au_km² = null;

    #[ORM\Column]
    private ?float $Variation_de_la_population_sur_10_ans_en = null;

    #[ORM\Column]
    private ?float $Dont_contribution_du_solde_naturel = null;

    #[ORM\Column]
    private ?float $Dont_contribution_du_solde_migratoire = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getConstruction(): ?float
    {
        return $this->construction;
    }

    public function setConstruction(float $construction): static
    {
        $this->construction = $construction;

        return $this;
    }

    public function getNombreLogement(): ?int
    {
        return $this->nombreLogement;
    }

    public function setNombreLogement(int $nombreLogement): static
    {
        $this->nombreLogement = $nombreLogement;

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

    public function getAnnéePublication(): ?int
    {
        return $this->année_publication;
    }

    public function setAnnéePublication(int $année_publication): static
    {
        $this->année_publication = $année_publication;

        return $this;
    }

    public function getNombredhabitants(): ?int
    {
        return $this->Nombredhabitants;
    }

    public function setNombredhabitants(int $Nombredhabitants): static
    {
        $this->Nombredhabitants = $Nombredhabitants;

        return $this;
    }

    public function getDensitéDePopulationAuKm²(): ?float
    {
        return $this->Densité_de_population_au_km²;
    }

    public function setDensitéDePopulationAuKm²(float $Densité_de_population_au_km²): static
    {
        $this->Densité_de_population_au_km² = $Densité_de_population_au_km²;

        return $this;
    }

    public function getVariationDeLaPopulationSur10AnsEn(): ?float
    {
        return $this->Variation_de_la_population_sur_10_ans_en;
    }

    public function setVariationDeLaPopulationSur10AnsEn(float $Variation_de_la_population_sur_10_ans_en): static
    {
        $this->Variation_de_la_population_sur_10_ans_en = $Variation_de_la_population_sur_10_ans_en;

        return $this;
    }

    public function getDontContributionDuSoldeNaturel(): ?float
    {
        return $this->Dont_contribution_du_solde_naturel;
    }

    public function setDontContributionDuSoldeNaturel(float $Dont_contribution_du_solde_naturel): static
    {
        $this->Dont_contribution_du_solde_naturel = $Dont_contribution_du_solde_naturel;

        return $this;
    }

    public function getDontContributionDuSoldeMigratoire(): ?float
    {
        return $this->Dont_contribution_du_solde_migratoire;
    }

    public function setDontContributionDuSoldeMigratoire(float $Dont_contribution_du_solde_migratoire): static
    {
        $this->Dont_contribution_du_solde_migratoire = $Dont_contribution_du_solde_migratoire;

        return $this;
    }
}
