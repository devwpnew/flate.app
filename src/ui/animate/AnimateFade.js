export default function AnimateFade({ children, isShow, ...props }) {
  return (
    <>
      {isShow && (
        <>{children}</>
        // <View {...props}>
        //   {children}
        // </View>
      )}
    </>
  );
}
