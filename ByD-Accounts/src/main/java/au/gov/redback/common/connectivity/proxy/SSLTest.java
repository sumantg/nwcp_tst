package au.gov.redback.common.connectivity.proxy;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.ProxySelector;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.GeneralSecurityException;
import java.security.KeyStore;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.DeflateDecompressingEntity;
import org.apache.http.client.entity.GzipDecompressingEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.scheme.SchemeSocketFactory;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.ProxySelectorRoutePlanner;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.core.connectivity.api.DestinationException;
import com.sap.core.connectivity.api.DestinationFactory;
import com.sap.core.connectivity.api.http.HttpDestination;

import com.sap.cloud.crypto.keystore.api.*;


public class SSLTest extends HttpServlet {

	private static final Logger LOGGER = LoggerFactory.getLogger(SSLTest.class);

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		super.destroy();
	}

	@Override
	public ServletConfig getServletConfig() {
		// TODO Auto-generated method stub
		return super.getServletConfig();
	}

	@Override
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return super.getServletInfo();
	}

	@Override
	public void init(ServletConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		super.init(arg0);
	}

	@Override
	public void service(ServletRequest arg0, ServletResponse arg1)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//Trust All   
        X509TrustManager tm = new X509TrustManager() {    
                  public void checkClientTrusted(    
                                      java.security.cert.X509Certificate[] arg0, String arg1)    
                                                          throws java.security.cert.CertificateException {}    
                  public void checkServerTrusted(    
                                      java.security.cert.X509Certificate[] arg0, String arg1)    
                                                          throws java.security.cert.CertificateException {}
				public X509Certificate[] getAcceptedIssuers() {
					// TODO Auto-generated method stub
					return null;
				}    
        };       

        DefaultHttpClient httpclient = new DefaultHttpClient();    
        //String host = "https://my307220.sapbydesign.com";
        String host = "https://encrypted.google.com";
            try {    
                  SSLContext ctx = SSLContext.getInstance("TLS");  
                  ctx.init(null, new X509TrustManager[]{tm}, null);  
                  SSLSocketFactory ssf = new SSLSocketFactory(ctx);  
                  ClientConnectionManager ccm = httpclient.getConnectionManager();  
                  SchemeRegistry sr = ccm.getSchemeRegistry();  
                  sr.register(new Scheme("https", 443, ssf));  
                  httpclient = new DefaultHttpClient(ccm, httpclient.getParams());  
                  httpclient.getCredentialsProvider().setCredentials(new AuthScope(host,443), new UsernamePasswordCredentials("_JAVAPOS","Welcome1"));
//Set Route to Default PROXY  

                  ProxySelectorRoutePlanner routePlanner = new ProxySelectorRoutePlanner(httpclient.getConnectionManager().getSchemeRegistry(),  
                                      ProxySelector.getDefault());  
                  httpclient.setRoutePlanner(routePlanner);  
//Target URL  
                  HttpGet httpget = new HttpGet(host);      
            
                  LOGGER.debug("executing request" + httpget.getRequestLine());

                  //System.out.println("executing request" + httpget.getRequestLine());    
                  HttpResponse response1 = httpclient.execute(httpget);    
                  HttpEntity entity = response1.getEntity();    
//");     
                  LOGGER.debug("Response:" + response1.getStatusLine());

                  System.out.println(response1.getStatusLine());    //
                  if (entity != null) {    
                	  	LOGGER.debug("Response content length: " + entity.getContentLength());
                            //System.out.println("Response content length: " + entity.getContentLength());    
                  }    
                  EntityUtils.consume(entity);    
        } catch (GeneralSecurityException e) {  
                  // TODO Auto-generated catch block
        		LOGGER.debug(e.getStackTrace().toString());
                  e.printStackTrace();  
        }     


        finally {    

                  httpclient.getConnectionManager().shutdown();    
        }

	}

}
