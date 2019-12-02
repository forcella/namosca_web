package br.com.stand.artilharia.dto;

import br.com.stand.artilharia.model.Reserva;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservaListarDTO {

  private Long id;
  private String cliente;
  private String ambiente;
  private LocalDateTime inicio;
  private LocalDateTime fim;
  private Integer qtdArmas;

  public static ReservaListarDTO converter(Reserva reserva) {
    return ReservaListarDTO.builder()
        .id(reserva.getId())
        .cliente(reserva.getCliente().getResumo())
        .ambiente(reserva.getAmbiente().getDescricao())
        .inicio(reserva.getInicioDaLocacao())
        .fim(reserva.getFimDaLocacao())
        .qtdArmas(reserva.getArmaLocadas().size())
        .build();
  }

}
