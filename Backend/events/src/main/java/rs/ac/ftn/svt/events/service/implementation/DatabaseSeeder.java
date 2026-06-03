package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import rs.ac.ftn.svt.events.repository.LocationRepository;

import javax.sql.DataSource;

@Component
public class DatabaseSeeder {

    private final DataSource dataSource;
    private final LocationRepository locationRepository;

    public DatabaseSeeder(DataSource dataSource, LocationRepository locationRepository) {
        this.dataSource = dataSource;
        this.locationRepository = locationRepository;
    }

    @Order(0)
    @EventListener(ApplicationReadyEvent.class)
    public void seedInitialDataIfDatabaseIsEmpty() {
        if (locationRepository.count() > 0) {
            return;
        }

        ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
        populator.addScript(new ClassPathResource("data.sql"));
        populator.setContinueOnError(false);
        DatabasePopulatorUtils.execute(populator, dataSource);
    }
}
