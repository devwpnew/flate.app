import Main from "../layout/main/main";
import Container from "../ui/common/container";

import MapButtonMap from "../layout/category/mapButtonMap";

export default function Map({ navigation, route }) {
  const filter = route?.params?.filter;
  return (
    <Main>
      <Container>
        {Boolean(filter) && <MapButtonMap filter={filter} />}
      </Container>
    </Main>
  );
}
