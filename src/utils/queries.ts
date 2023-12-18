import groq from "groq";

export const siteNavQuery = groq`
*[_type == "siteNav"][0] {
  ...,
  navMain[] {
    routeGroup-> {
      title
    },
    subRoutes[] -> {
      title
    }
  }
}
`;
