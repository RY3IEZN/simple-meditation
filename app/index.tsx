/** @format */

import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

const App = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar translucent />
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={beachImage}
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex-1 mx-5 mt-10 justify-between">
            <View>
              <Text className="text-white text-center font-medium text-4xl">
                Simple Meditation
              </Text>
              <Text className="text-white text-center font-small text-2xl">
                Simplifying meditation for everyone
              </Text>
            </View>
            <View className="mb-5">
              <CustomButton
                onPress={() => {
                  router.push("/nature-meditate");
                }}
                title="Get Started"
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default App;
