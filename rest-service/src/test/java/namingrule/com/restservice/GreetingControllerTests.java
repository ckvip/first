package namingrule.com.restservice;

import com.fasterxml.jackson.core.type.TypeReference;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.namingrule.models.Greeting;
import org.namingrule.services.GreetingService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

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
        Assert.assertEquals(200, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        List<Greeting> objResult = this.fromJson(strResult, new TypeReference<List<Greeting>>() {});
        Assert.assertEquals(expected.size(), objResult.size());
        for (int i = 0; i < expected.size(); i++) {
            Assert.assertEquals(expected.get(i).getMessage(), objResult.get(i).getMessage());
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
        Assert.assertEquals(200, result.getResponse().getStatus());
        String strResult = result.getResponse().getContentAsString();
        List<Greeting> objResult = this.fromJson(strResult, new TypeReference<List<Greeting>>() {});
        Assert.assertEquals(expected.size(), objResult.size());
        for (int i = 0; i < expected.size(); i++) {
            Assert.assertEquals(expected.get(i).getMessage(), objResult.get(i).getMessage());
        }
    }
}
