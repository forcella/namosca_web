package br.com.stand.artilharia.model;

import br.com.stand.artilharia.dto.ArmaLocadaDto;
import br.com.stand.artilharia.dto.ReservaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reserva implements Serializable {

  private static final long serialVersionUID = -5854016886822004154L;

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  @ManyToOne
  private Cliente cliente;

  @ManyToOne
  private Ambiente ambiente;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
  private LocalDateTime inicioDaLocacao;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
  private LocalDateTime fimDaLocacao;
  @OneToMany(mappedBy = "reserva")
  private Set<ArmaLocada> armaLocadas;
  @Column(columnDefinition = "boolean default true")
  private Boolean ativa;

  public ReservaDTO converter() {
    return ReservaDTO.builder()
        .clienteSelecionado(cliente.getId())
        .ambienteSelecionado(ambiente.getId())
        .armasLocadas(converterArmasLocadas(armaLocadas))
        .ativa(ativa)
        .inicioDaLocacao(inicioDaLocacao)
        .fimDaLocacao(fimDaLocacao)
        .build();
  }

  private List<ArmaLocadaDto> converterArmasLocadas(Set<ArmaLocada> armalocadas){
  return armalocadas.stream().map(ArmaLocada::converterParaDto).collect(Collectors.toList());
  }
}