package br.com.stand.artilharia.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.stand.artilharia.enums.Marca;
import br.com.stand.artilharia.enums.Calibre;
import br.com.stand.artilharia.enums.SituacaoDaArma;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Arma implements Serializable {

    private static final long serialVersionUID = -4560616246394961016L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private Marca marca;

    @Enumerated(EnumType.STRING)
    private Calibre calibre;

    @Enumerated(EnumType.STRING)
    private SituacaoDaArma situacao;
}