package edu.saasta.carrental.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.saasta.carrental.entity.Car;

@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {

    @Autowired
    MockMvc mockMvc;
    
    
    
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    @DisplayName(value = "Add initial Customer")
    void checkInitCustomer() throws Exception {
        mockMvc.perform(get("/customers")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Jesper S"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].phoneNumber").value("0768264531"));
    }
    
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    @DisplayName(value = "Add initial Car")
    void checkInitCar() throws Exception {
        mockMvc.perform(get("/allcars")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Audi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].model").value("S2 - 1992"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].price").value(2899.0))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].available").value(true))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].active").value(true));
    }
    
    @Test
    @WithMockUser(username = "user", password = "user", roles = "USER")
    @DisplayName(value = "Add initial Order as User")
    void checkInitOrderAsUser() throws Exception {
        mockMvc.perform(get("/myorders")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].fromDate").value("2020-10-06 00:00"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].endDate").value("2020-10-10 24:00"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].active").value(true));
    }
    
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    @DisplayName(value = "Add initial Order as Admin")
    void checkInitOrderAsAdmin() throws Exception {
        mockMvc.perform(get("/myorders")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].fromDate").value("2020-10-06 00:00"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].endDate").value("2020-10-10 24:00"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].active").value(true));
    }
    
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    @DisplayName(value = "Create new Car as Admin")
    void createNewCarAsAdmin() throws Exception {
    	Car car = new Car();
    	car.setName("Test");
    	car.setModel("Test");
    	car.setPrice(10.0);
        mockMvc.perform(MockMvcRequestBuilders.post("/addcar")
        	      .content(asJsonString(car))
        	      .contentType(MediaType.APPLICATION_JSON)
        	      .accept(MediaType.APPLICATION_JSON))
        	      .andExpect(status().isOk())
        	      .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }
    
    @Test
    @WithMockUser(username = "user", password = "user", roles = "USER")
    @DisplayName(value = "Create new Car as User return 403")
    void createNewCarAsUser() throws Exception {
    	Car car = new Car();
    	car.setName("Test");
    	car.setModel("Test");
    	car.setPrice(10.0);
        mockMvc.perform(MockMvcRequestBuilders.post("/addcar")
        	      .content(asJsonString(car))
        	      .contentType(MediaType.APPLICATION_JSON)
        	      .accept(MediaType.APPLICATION_JSON))
        	      .andExpect(status().isForbidden());
    }
	
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
}
