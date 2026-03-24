<?php

namespace App\Entity;

use App\Repository\DepartementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;
use App\Entity\Region;


#[ORM\Entity(repositoryClass: DepartementRepository::class)]
class Departement
{
    /*#[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;*/

    #[ORM\Id]
    #[ORM\Column(length: 3)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $code = null;

    #[ORM\Column(length: 255)]
    #[Groups(['logement', 'departement', 'region'])]
    private ?string $nom = null;

    #[ORM\ManyToOne(inversedBy: 'departements')]
    #[ORM\JoinColumn(
        name: "code_region",
        referencedColumnName: "code",
        nullable: false
    )]
    #[Groups(['departement', 'logement'])]
    private ?Region $codeRegion = null;

    /**
     * @var Collection<int, StatistiqueLogement>
     */
    #[ORM\OneToMany(targetEntity: StatistiqueLogement::class, mappedBy: 'departement')]
    #[Groups(['departement', 'region'])]
    private Collection $statistiqueLogements;

    public function __construct()
    {
        $this->statistiqueLogements = new ArrayCollection();
    }

    /*public function getId(): ?int
    {
        return $this->id;
    }*/

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getCodeRegion(): ?Region
    {
        return $this->codeRegion;
    }

    public function setCodeRegion(?Region $codeRegion): static
    {
        $this->codeRegion = $codeRegion;

        return $this;
    }

    /**
     * @return Collection<int, StatistiqueLogement>
     */
    public function getStatistiqueLogements(): Collection
    {
        return $this->statistiqueLogements;
    }

    public function addStatistiqueLogement(StatistiqueLogement $statistiqueLogement): static
    {
        if (!$this->statistiqueLogements->contains($statistiqueLogement)) {
            $this->statistiqueLogements->add($statistiqueLogement);
            $statistiqueLogement->setDepartement($this);
        }

        return $this;
    }

    public function removeStatistiqueLogement(StatistiqueLogement $statistiqueLogement): static
    {
        if ($this->statistiqueLogements->removeElement($statistiqueLogement)) {
            // set the owning side to null (unless already changed)
            if ($statistiqueLogement->getDepartement() === $this) {
                $statistiqueLogement->setDepartement(null);
            }
        }

        return $this;
    }
}
