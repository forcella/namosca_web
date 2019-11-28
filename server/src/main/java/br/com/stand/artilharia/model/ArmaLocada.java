package br.com.stand.artilharia.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ArmaLocada implements Serializable {
    private static final long serialVersionUID = -1480985512327327668L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private int quantidade;
    @ManyToOne
    private Reserva reserva;
    private Arma arma;
}