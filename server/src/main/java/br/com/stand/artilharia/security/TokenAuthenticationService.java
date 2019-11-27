package br.com.stand.artilharia.security;

import java.util.Collections;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import br.com.stand.artilharia.exception.TokenExpiredException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

class TokenAuthenticationService {

  // EXPIRATION_TIME = 60 min
  static final long EXPIRATION_TIME = 3600000;
  static final String SECRET = "MySecret";
  static final String HEADER_STRING = "Authorization";

  static void addAuthentication(HttpServletResponse response, String username) {
    String JWT = Jwts.builder().setSubject(username)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, SECRET).compact();

    response.addHeader(HEADER_STRING, JWT);
  }

  static Authentication getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(HEADER_STRING);

    try {
      String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();

      if (user != null) {
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
      }
    } catch (SignatureException ex) {
      System.out.println("Invalid JWT Signature");
    } catch (MalformedJwtException ex) {
      System.out.println("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      System.out.println("Expired JWT token");
      new TokenExpiredException("expired");
    } catch (UnsupportedJwtException ex) {
      System.out.println("Unsupported JWT exception");
    } catch (IllegalArgumentException ex) {
      System.out.println("Jwt claims string is empty");
    }

    return null;
  }

}
