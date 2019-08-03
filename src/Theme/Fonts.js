import { moderateScale } from "react-native-size-matters";

const size = {
  h1: moderateScale(38),
  h2: moderateScale(34),
  h3: moderateScale(30),
  input: moderateScale(18),
  regular: moderateScale(17),
  medium: moderateScale(14),
  small: moderateScale(12),
}

const style = {
  h1: {
    fontSize: size.h1,
  },
  h2: {
    fontSize: size.h2,
  },
  h3: {
    fontSize: size.h3,
  },
  normal: {
    fontSize: size.regular,
  },
}

export default {
  size,
  style,
}
