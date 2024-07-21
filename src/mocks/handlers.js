// mocks/handlers.js
import { http, HttpResponse } from 'msw';
import TabObj from './TabObj.json';
 
export const handlers = [
    http.get('/tabcontainer', async (req, res, ctx) => {
    return HttpResponse.json(TabObj)
  }),
]