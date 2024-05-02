import Main from "../layout/main/main";
import Footer from "../layout/main/footer";
import Container from "../ui/common/container";
import FormAddRc from "./user/form/formAddRc";

export default function AddRc({ navigation }) {
  return (
    <>
      <Main>
        <FormAddRc />
        <Footer navigation={navigation} />
      </Main>
    </>
  );
}
