import Paragraph from "../../../ui/text/paragraph";

export default function LoginMessage({ style, error }) {
  return (
    <>
      {error ? (
        <Paragraph style={{ ...style, textAlign: "center" }} color="blue">
          {error}
        </Paragraph>
      ) : (
        <></>
      )}
    </>
  );
}
