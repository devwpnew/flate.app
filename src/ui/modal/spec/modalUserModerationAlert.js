import tw from "../../../../lib/tailwind";

import DText from "../../text/dText";
import DModal from "../dModal";

export default function ModalUserModerationAlert({ ...props }) {
  return (
    <DModal {...props}>
      <DText style={tw`text-lg font-bold mb-[10px]`}>
        Ваш аккаунт на модерации!
      </DText>

      <DText style={tw`text-lg text-center`}>
        После одобрения, вам будут доступны все возможности и функции. Обычно
        это занимает не более часа.
      </DText>
    </DModal>
  );
}
