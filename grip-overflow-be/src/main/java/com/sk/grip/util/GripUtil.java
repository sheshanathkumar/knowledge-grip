package com.sk.grip.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class GripUtil {

    public static String convertDate (Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy hh:mma");
        return dateFormat.format(date);
    }
}
