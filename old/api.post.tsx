import type { ActionArgs } from "@remix-run/node"; 
import { json } from "@remix-run/node";

export const action = async ({ request }: ActionArgs) => {
  switch (request.method) {
    case "POST": {
      return json({post: "Halo"})
    }
    case "PUT": {
      /* handle "PUT" */
    }
    case "PATCH": {
      /* handle "PATCH" */
    }
    case "DELETE": {
      /* handle "DELETE" */
    }
  }
};