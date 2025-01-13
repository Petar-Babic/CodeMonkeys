// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class StartaworkoutTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new FirefoxDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void startaworkout() {
    driver.get("https://gymprogress.lukakordic.me/");
    driver.manage().window().setSize(new Dimension(703, 821));
    driver.findElement(By.linkText("Go to the app")).click();
    {
      WebElement element = driver.findElement(By.linkText("Go to the app"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.id(":r0:-form-item")).sendKeys("qedgncccshgttwgfxj@poplk.com");
    driver.findElement(By.name("password")).sendKeys("qedgncccshgttwgfxj@poplk.com");
    driver.findElement(By.cssSelector(".inline-flex > span")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".inline-flex > span"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.cssSelector(".h-9 > span")).click();
    driver.close();
    driver.findElement(By.linkText("Go to the app")).click();
    driver.findElement(By.id(":r0:-form-item")).sendKeys("qedgncccshgttwgfxj@poplk.com");
    driver.findElement(By.name("password")).sendKeys("qedgncccshgttwgfxj@poplk.com");
    driver.findElement(By.cssSelector(".inline-flex")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".mt-8 > .w-full"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    {
      WebElement element = driver.findElement(By.tagName("body"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element, 0, 0).perform();
    }
    driver.findElement(By.cssSelector(".h-9")).click();
    driver.close();
  }
}
