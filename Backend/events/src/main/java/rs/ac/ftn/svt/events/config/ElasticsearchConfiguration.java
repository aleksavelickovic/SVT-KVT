package rs.ac.ftn.svt.events.config;

import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ElasticsearchConfiguration {

    @Value("${app.elasticsearch.host}")
    private String host;

    @Value("${app.elasticsearch.port}")
    private int port;

    @Value("${app.elasticsearch.scheme}")
    private String scheme;

    @Bean(destroyMethod = "close")
    public RestHighLevelClient restHighLevelClient() {
        return new RestHighLevelClient(
                RestClient.builder(new HttpHost(host, port, scheme))
        );
    }
}
