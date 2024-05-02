import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

function LogoIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={155}
      height={36}
      viewBox="0 0 155 36"
      fill="none"
      {...props}
    >
      <Path
        d="M7.827 1.701h8.575v3.574H7.827V16.69l6.242-1.304.007 4.048-9.466 2.243h3.217v14.316H1.393v-32.9L0 1.702h7.827zm20.58 29.71V1.708h-7.821l1.393 1.393v30.251A2.65 2.65 0 0024.627 36H36.98v-3.574H25.546l2.86-1.015zm61.737 1.16V21.683h-3.217l9.466-2.244-.007-4.047-6.242 1.304V5.275h8.575V1.701H82.324l1.392 1.393V36h15.038v-3.43h-8.61zM66.512 1.7H61.71v3.43h-.027l.034 1.393L63.11 5.13h3.395V36h6.517V5.131h3.69l1.393 1.393.034-1.393h.028v-3.43H66.512zm-13.575 0h4.657V36h-6.516V21.636l-4.343 1.557L43.046 36h-2.058l9.604-33.304-.995-.995h3.341zm-1.86 16.32V8.148l-3.175 11.01 3.176-1.139z"
        fill="#111827"
      />
      <Path
        d="M150.003 19.207h-39.032a4.508 4.508 0 01-4.493-4.493V4.494A4.508 4.508 0 01110.971 0h39.032a4.509 4.509 0 014.493 4.493v10.221a4.509 4.509 0 01-4.493 4.493z"
        fill="#EFF6FF"
      />
      <Path
        d="M120.732 4.774c-.878-.734-2.086-1.097-3.622-1.097h-4.624V15.53h1.695v-3.587h2.929c1.536 0 2.744-.364 3.622-1.098.878-.734 1.324-1.742 1.324-3.032-.007-1.296-.446-2.305-1.324-3.039zm-1.221 5.008c-.563.46-1.386.686-2.456.686h-2.881V5.152h2.881c1.07 0 1.893.226 2.456.686.562.46.843 1.118.843 1.975 0 .85-.281 1.51-.843 1.969zm13.918.364c.453-.645.679-1.42.679-2.34 0-1.29-.439-2.298-1.324-3.032-.878-.734-2.085-1.097-3.622-1.097h-4.623V15.53h1.694v-3.608h2.929c.179 0 .433-.014.748-.034l2.559 3.642h1.845l-2.812-3.978c.83-.295 1.474-.762 1.927-1.406zm-4.315.336h-2.881V5.145h2.881c1.071 0 1.894.226 2.456.686.563.46.844 1.118.844 1.975 0 .858-.281 1.516-.844 1.983-.569.46-1.385.693-2.456.693zm18.556-3.986a5.8 5.8 0 00-2.25-2.168c-.96-.528-2.03-.788-3.217-.788-1.194 0-2.278.26-3.231.788a5.846 5.846 0 00-2.264 2.175c-.549.926-.823 1.962-.823 3.1 0 1.14.274 2.175.823 3.101a5.798 5.798 0 002.264 2.175c.96.528 2.037.789 3.231.789 1.187 0 2.257-.261 3.217-.79a5.799 5.799 0 002.25-2.167c.542-.92.809-1.955.809-3.107 0-1.153-.267-2.189-.809-3.108zm-1.482 5.433a4.307 4.307 0 01-1.639 1.633c-.693.398-1.475.59-2.346.59s-1.66-.2-2.36-.59a4.312 4.312 0 01-1.66-1.633 4.589 4.589 0 01-.604-2.325c0-.858.199-1.633.604-2.326a4.265 4.265 0 011.66-1.632c.707-.398 1.495-.59 2.36-.59.871 0 1.653.198 2.346.59.693.397 1.241.94 1.639 1.632.398.693.604 1.468.604 2.326 0 .857-.206 1.632-.604 2.325z"
        fill="url(#paint0_linear_2783_5726)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2783_5726"
          x1={112.483}
          y1={9.60193}
          x2={148.483}
          y2={9.60193}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2563EB" />
          <Stop offset={1} stopColor="#67E7F9" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default LogoIcon;