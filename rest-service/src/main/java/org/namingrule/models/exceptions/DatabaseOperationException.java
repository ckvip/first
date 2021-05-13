package org.namingrule.models.exceptions;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class DatabaseOperationException extends AppException {
    private static final Logger logger = LogManager.getLogger(DatabaseOperationException.class);
    public DatabaseOperationException(String msg, Throwable ex) {
        super(msg, ex, 500);
        logger.error(msg, ex);
    }
}
