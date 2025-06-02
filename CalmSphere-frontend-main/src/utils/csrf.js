import axios from 'axios';

     const getCsrfToken = async () => {
       try {
         const response = await axios.get('/api/get-csrf-token/');
         return response.data.csrfToken;
       } catch (error) {
         console.error('Failed to fetch CSRF token:', error);
         return null;
       }
     };

     export default getCsrfToken;