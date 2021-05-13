package org.namingrule.models.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class NotFoundException extends AppException {
    private static final Logger logger = LogManager.getLogger(NotFoundException.class);

    public NotFoundException(long id) {
        super(String.format("Not found the record with id:%s", id), 404);
        logger.error(this.getMessage());
    }
}
