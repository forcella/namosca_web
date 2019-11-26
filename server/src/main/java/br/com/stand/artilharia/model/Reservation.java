package br.com.stand.artilharia.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
public class Reservation implements Serializable {
    private static final long serialVersionUID = -5854016886822004154L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private Client client;
    private LocalDateTime fromDateTime;
    private LocalDateTime toDateTime;
    @OneToMany(mappedBy = "reservation")
    private Set<LocatedGun> locatedGuns;

}