package br.com.stand.artilharia.service;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import br.com.stand.artilharia.AbstractIntegrationTests;
import br.com.stand.artilharia.enums.Calibre;
import br.com.stand.artilharia.enums.Marca;
import br.com.stand.artilharia.enums.SituacaoDaArma;
import br.com.stand.artilharia.model.Ambiente;
import br.com.stand.artilharia.model.Arma;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.jdbc.Sql;

public class AmbienteTest extends AbstractIntegrationTests {

  @Autowired
  AmbienteService ambienteService;


  @Test
  @Sql({
      "/dataset/truncate.sql",
      "/dataset/ambientes.sql"
  })
  public void deveBuscarTodosAmbientes() {
    Page<Ambiente> ambientes = ambienteService.getAll("", PageRequest.of(0, 100));
    assertThat(ambientes.getContent(), hasSize(2));
  }
//
//  @Test
//  @Sql({
//      "/dataset/truncate.sql",
//      "/dataset/armas.sql"
//  })
//  public void deveSalvarAmbiente() {
//    Arma arma = Arma.builder()
//        .calibre(Calibre.CAL_38)
//        .descricao("arma 4")
//        .marca(Marca.CBC)
//        .situacao(SituacaoDaArma.DISPONIVEL)
//        .build();
//
//    armaService.save(arma);
//    assertNotNull(arma);
//    assertNotNull(arma.getId());
//  }

//  @Test
//  @Sql({
//      "/dataset/truncate.sql",
//      "/dataset/armas.sql"
//  })
//
//  public void deveBuscarUmaArma() {
//    Arma arma = armaService.findOne(1001L);
//    assertNotNull(arma);
//    assertNotNull(arma.getId());
//  }
//
//  @Test
//  @Sql({
//      "/dataset/truncate.sql",
//      "/dataset/armas.sql"
//  })
//  public void deveAtualizarArma() {
//    Arma arma = Arma.builder()
//        .calibre(Calibre.CAL_9MM)
//        .descricao("arma 1")
//        .marca(Marca.CBC)
//        .situacao(SituacaoDaArma.DISPONIVEL)
//        .build();
//
//    armaService.update(1001L, arma);
//    assertThat(arma.getId(), equalTo(1001L));
//    assertEquals(Calibre.CAL_9MM, arma.getCalibre());
//
//  }
}
