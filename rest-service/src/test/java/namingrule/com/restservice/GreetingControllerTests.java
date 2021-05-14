package namingrule.com.restservice;

import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.namingrule.models.CustomErrorResponse;
import org.namingrule.models.Greeting;
import org.namingrule.models.exceptions.DatabaseOperationException;
import org.namingrule.models.exceptions.NotFoundException;
import org.namingrule.services.GreetingService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;

class GreetingControllerTests extends AbstractTests {
    @MockBean
    private GreetingService service;

    @Test
    public void getAllGreetingsTest() throws Exception {
        ArrayList<Greeting> expected = new ArrayList<>();
        expected.add(new Greeting("abc"));
        Mockito.when(service.getAll()).thenReturn(expected);
        RequestBuilder request = MockMvcRequestBuilders
                .get("/greeting")
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = this.mvc.perform(request).andReturn();
        assertEquals(200, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        List<Greeting> objResult = this.fromJson(strResult, new TypeReference<List<Greeting>>() {
        });
        assertEquals(expected.size(), objResult.size());
        for (int i = 0; i < expected.size(); i++) {
            assertEquals(expected.get(i).getMessage(), objResult.get(i).getMessage());
        }
    }

    @Test
    public void getGreetingsByMessageTest() throws Exception {
        ArrayList<Greeting> expected = new ArrayList<>();
        String msg = "abc";
        expected.add(new Greeting(msg));
        Mockito.when(service.getByMessage(msg)).thenReturn(expected);
        RequestBuilder request = MockMvcRequestBuilders
                .get("/greeting?message=" + msg)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = this.mvc.perform(request).andReturn();
        assertEquals(200, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        List<Greeting> objResult = this.fromJson(strResult, new TypeReference<List<Greeting>>() {
        });
        assertEquals(expected.size(), objResult.size());
        for (int i = 0; i < expected.size(); i++) {
            assertEquals(expected.get(i).getMessage(), objResult.get(i).getMessage());
        }
    }

    @Test
    public void createGreetingTest() throws Exception {
        Greeting posted = new Greeting("World");
        Mockito.when(service.save(any(Greeting.class))).thenReturn(posted);
        String body = this.toJson(posted);
        RequestBuilder request = MockMvcRequestBuilders
                .post("/greeting")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = this.mvc.perform(request).andReturn();
        assertEquals(200, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        Greeting objResult = this.fromJson(strResult, Greeting.class);
        assertEquals(objResult.getMessage(), "World");

    }

    @Test
    public void getGreetingsById_WithNotFoundExceptionTest() throws Exception {
        long id = 1;
        Mockito.when(service.getById(id)).thenThrow(new NotFoundException(id));
        RequestBuilder request = MockMvcRequestBuilders
                .get("/greeting/" + id)
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = this.mvc.perform(request).andReturn();
        assertEquals(404, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        CustomErrorResponse objResult = this.fromJson(strResult, CustomErrorResponse.class);
        assertEquals(objResult.getCode(), (Integer) 404);
        assertEquals(objResult.getMessage(), "Not found the record with id:" + id);

    }

    @Test
    public void deleteGreeting_WithErrorTest() throws Exception {
        long id = 1;
        Mockito.when(service.delete(id)).thenThrow(new DatabaseOperationException("Fail to delete", new RuntimeException()));
        RequestBuilder request = MockMvcRequestBuilders
                .delete("/greeting/" + id)
                .accept(MediaType.APPLICATION_JSON);
        MvcResult result = this.mvc.perform(request).andReturn();
        assertEquals(500, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        CustomErrorResponse objResult = this.fromJson(strResult, CustomErrorResponse.class);
        assertEquals(objResult.getCode(), (Integer) 500);
        assertEquals(objResult.getMessage(), "Fail to delete");
    }
}
