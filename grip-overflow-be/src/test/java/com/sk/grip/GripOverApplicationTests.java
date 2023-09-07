package com.sk.grip;

import com.sk.grip.util.GripUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class GripOverApplicationTests {

	@Test
	public void convertDateTes() {
		Date date = new Date();
		String d = GripUtil.convertDate(date);
		System.out.println(d);
	}

}
