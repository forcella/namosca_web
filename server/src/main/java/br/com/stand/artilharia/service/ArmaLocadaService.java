package br.com.stand.artilharia.service;

import br.com.stand.artilharia.dto.ArmaLocadaDto;
import br.com.stand.artilharia.model.Arma;
import br.com.stand.artilharia.model.ArmaLocada;
import br.com.stand.artilharia.model.Reserva;
import br.com.stand.artilharia.repository.ArmaLocadaRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ArmaLocadaService {
  private ArmaService armaService;
  private ArmaLocadaRepository repo;

  public Set<ArmaLocada> salvaArmasLocadas(List<ArmaLocadaDto> armasLocadasDTO, Reserva reserva){
    Set<ArmaLocada> armasLocadas = new HashSet<>();
    armasLocadasDTO.forEach(dto-> {
      Arma arma = armaService.findOne(dto.getId());
      ArmaLocada armaLocada = ArmaLocada.builder()
          .arma(arma)
          .quantidade(dto.getQuantidade())
          .reserva(reserva)
          .build();
      armasLocadas.add(armaLocada);
    });
    repo.saveAll(armasLocadas);
    return armasLocadas;
  }
}
