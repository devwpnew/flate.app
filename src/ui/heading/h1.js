import tw from "../../../lib/tailwind";

import DText from "../text/dText";

export default function H1({children}) {
  return (
    <DText style={tw`text-primary text-2xl font-bold`}>
      {children}
    </DText>
  );
}
