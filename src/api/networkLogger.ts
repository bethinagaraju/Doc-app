import axios from 'axios';

let requestCounter = 0;

// Save the original fetch function
const originalFetch = global.fetch;

// Override the global fetch function
global.fetch = async function (input: any, init?: any) {
  const reqId = ++requestCounter;
  let url = '';
  let method = 'GET';
  let headers = {};
  let body: any = null;

  try {
    if (typeof input === 'string') {
      url = input;
    } else if (input && typeof input === 'object') {
      url = input.url || '';
      method = input.method || 'GET';
      headers = input.headers || {};
    }

    if (init) {
      if (init.method) method = init.method;
      if (init.headers) headers = init.headers;
      if (init.body) body = init.body;
    }

    const isFollowUpBooking = url.includes('schedule-checkup-appointment');

    if (isFollowUpBooking) {
      console.log(`\n🚨🚨🚨 [HTTP REQUEST #${reqId}] FOLLOW-UP APPOINTMENT BOOKING DETECTED 🚨🚨🚨`);
    } else {
      console.log(`\n=================== [HTTP REQUEST #${reqId}] ===================`);
    }

    console.log(`Method: ${method.toUpperCase()}`);
    console.log(`URL: ${url}`);
    console.log(`Headers:`, JSON.stringify(headers, null, 2));

    if (body) {
      try {
        if (typeof body === 'string') {
          console.log(`Body:`, JSON.stringify(JSON.parse(body), null, 2));
        } else {
          console.log(`Body:`, body);
        }
      } catch (e) {
        console.log(`Body:`, body);
      }
    }

    if (isFollowUpBooking) {
      console.log(`🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n`);
    } else {
      console.log(`================================================================\n`);
    }
  } catch (err) {
    console.log(`[Logger Error parsing request #${reqId}]:`, err);
  }

  // Call the original fetch
  let response: Response;
  try {
    response = await originalFetch(input, init);
  } catch (err) {
    console.log(`\n[HTTP REQUEST #${reqId} FAILED] Error:`, err);
    throw err;
  }

  try {
    const isFollowUpBooking = url.includes('schedule-checkup-appointment');
    const responseClone = response.clone();
    let responseBodyText = '';
    try {
      responseBodyText = await responseClone.text();
    } catch (e: any) {
      responseBodyText = `<Failed to read body: ${e.message}>`;
    }

    if (isFollowUpBooking) {
      console.log(`\n🚨🚨🚨 [HTTP RESPONSE #${reqId}] FOLLOW-UP APPOINTMENT RESPONSE 🚨🚨🚨`);
    } else {
      console.log(`\n=================== [HTTP RESPONSE #${reqId}] ===================`);
    }

    console.log(`URL: ${url}`);
    console.log(`Status: ${response.status} (${response.statusText || 'OK'})`);

    let loggedHeaders: any = {};
    if (response.headers && typeof response.headers.forEach === 'function') {
      response.headers.forEach((val, key) => {
        loggedHeaders[key] = val;
      });
    } else {
      loggedHeaders = response.headers;
    }
    console.log(`Headers:`, JSON.stringify(loggedHeaders, null, 2));

    if (responseBodyText) {
      try {
        console.log(`Body:`, JSON.stringify(JSON.parse(responseBodyText), null, 2));
      } catch (e) {
        console.log(`Body:`, responseBodyText);
      }
    }

    if (isFollowUpBooking) {
      console.log(`🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n`);
    } else {
      console.log(`=================================================================\n`);
    }
  } catch (err) {
    console.log(`[Logger Error parsing response #${reqId}]:`, err);
  }

  return response;
};

// Set up Axios interceptors globally as well, in case Axios is used
try {
  axios.interceptors.request.use(
    (config) => {
      const reqId = ++requestCounter;
      (config as any)._reqId = reqId;

      console.log(`\n=================== [AXIOS REQUEST #${reqId}] ===================`);
      console.log(`Method: ${config.method?.toUpperCase() || 'GET'}`);
      console.log(`URL: ${config.url}`);
      console.log(`Headers:`, JSON.stringify(config.headers, null, 2));

      if (config.data) {
        try {
          if (typeof config.data === 'string') {
            console.log(`Body:`, JSON.stringify(JSON.parse(config.data), null, 2));
          } else {
            console.log(`Body:`, JSON.stringify(config.data, null, 2));
          }
        } catch {
          console.log(`Body:`, config.data);
        }
      }
      console.log(`=================================================================\n`);
      return config;
    },
    (error) => {
      console.log(`[AXIOS REQUEST ERROR]`, error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      const reqId = (response.config as any)._reqId || 'unknown';

      console.log(`\n=================== [AXIOS RESPONSE #${reqId}] ===================`);
      console.log(`URL: ${response.config.url}`);
      console.log(`Status: ${response.status} (${response.statusText || 'OK'})`);
      console.log(`Headers:`, JSON.stringify(response.headers, null, 2));

      if (response.data) {
        console.log(`Body:`, JSON.stringify(response.data, null, 2));
      }
      console.log(`==================================================================\n`);
      return response;
    },
    (error) => {
      const reqId = (error.config as any)?._reqId || 'unknown';

      console.log(`\n=================== [AXIOS ERROR RESPONSE #${reqId}] ===================`);
      if (error.config) {
        console.log(`URL: ${error.config.url}`);
      }
      if (error.response) {
        console.log(`Status: ${error.response.status} (${error.response.statusText || 'Error'})`);
        console.log(`Headers:`, JSON.stringify(error.response.headers, null, 2));
        console.log(`Body:`, JSON.stringify(error.response.data, null, 2));
      } else {
        console.log(`Message: ${error.message}`);
      }
      console.log(`========================================================================\n`);
      return Promise.reject(error);
    }
  );
} catch (e) {
  console.warn('Axios interceptor failed to initialize:', e);
}
