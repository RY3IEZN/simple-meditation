/** @format */

import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: number) => {
    setDuration(duration);
    router.back();
  };

  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b23", "#0a4d4a", "#766e67"]}>
        <Pressable
          className="absolute top-10 left-6 z-10"
          onPress={() => router.back()}
        >
          <AntDesign name="leftcircleo" size={30} color={"white"} />
        </Pressable>
        <View className="justify-center h-4/5">
          <Text className="text-center text-white font-bold text-3xl mb-3">
            Adjust your meditation duration
          </Text>
          <View>
            <CustomButton
              title="10 Seconds"
              onPress={() => {
                handlePress(10);
              }}
              containerStyles="mb-5"
            />
            <CustomButton
              title="5 Minutes"
              onPress={() => {
                handlePress(5 * 60);
              }}
              containerStyles="mb-5"
            />
            <CustomButton
              title="10 Minutes"
              onPress={() => {
                handlePress(10 * 60);
              }}
              containerStyles="mb-5"
            />
            <CustomButton
              title="15 Minutes"
              onPress={() => {
                handlePress(15 * 60);
              }}
              containerStyles="mb-5"
            />
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;