package br.com.stand.artilharia.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.stand.artilharia.enums.Brand;
import br.com.stand.artilharia.enums.Caliber;
import br.com.stand.artilharia.enums.GunSituation;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Gun implements Serializable {

    private static final long serialVersionUID = -4560616246394961016L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String description;

    @Enumerated(EnumType.STRING)
    private Brand brand;

    @Enumerated(EnumType.STRING)
    private Caliber cabilber;

    @Enumerated(EnumType.STRING)
    private GunSituation situation;
}