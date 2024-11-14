/** @format */

import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Content = ({ children }) => {
  return <SafeAreaView className="flex-1 px-5 py-3">{children}</SafeAreaView>;
};

export default Content;