package rs.ac.ftn.svt.events.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LocationLoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LocationLoggingAspect.class);

    @Pointcut("within(rs.ac.ftn.svt.events.controller.LocationController)")
    public void allControllerMethods() {
    }

    @Around("allControllerMethods()")
    public Object logControllerMethods(ProceedingJoinPoint joinPoint) throws Throwable {
        String method = joinPoint.getSignature().getName();
        Object returnval = null;
        switch (method) {
            case "findAll":
                LOGGER.info("POZVANA findAll METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA findAll METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA findAll METODE!");
                }
                break;
            case "addLocation":
                LOGGER.info("POZVANA addLocation METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA addLocation METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA addLocation METODE!");
                }
                break;
            case "deleteLocation":
                LOGGER.info("POZVANA deleteLocation METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA deleteLocation METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA deleteLocation METODE!");
                }
                break;
            case "editLocation":
                LOGGER.info("POZVANA editLocation METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA editLocation METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA editLocation METODE!");
                }
                break;
            case "findManagedLocations":
                LOGGER.info("POZVANA findManagedLocations METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA findManagedLocations METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA findManagedLocations METODE!");
                }
                break;
            case "findOne":
                LOGGER.info("POZVANA findOne METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA findOne METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA findOne METODE!");
                }
                break;
            case "getAllManagers":
                LOGGER.info("POZVANA getAllManagers METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA getAllManagers METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA getAllManagers METODE!");
                }
                break;
            case "addManager":
                LOGGER.info("POZVANA addManager METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA addManager METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA addManager METODE!");
                }
                break;
            case "search":
                LOGGER.info("POZVANA search METODA!");
                try {
                    returnval = joinPoint.proceed();
                    LOGGER.info("ZAVRSENA search METODA!");
                } catch (Throwable e) {
                    LOGGER.error("GRESKA PRILIKOM IZVRSAVANJA search METODE!");
                }
                break;


            default:
                LOGGER.info("NIJE POZVANA NIJEDNA METODA!");
        }

        return returnval;
    }
}
