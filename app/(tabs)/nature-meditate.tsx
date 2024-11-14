/** @format */

import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React from "react";
import AppGradient from "@/components/AppGradient";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <StatusBar translucent />
        <View className="mb-6 ">
          <Text className="text-gray-200 font-bold text-4xl text-left">
            Welcome User,
          </Text>
          <Text className="text-indigo-100 font-medium text-xl text-left">
            Start your meditation practice today
          </Text>
        </View>
        <View>
          <FlatList
            // key={(item) => item.id.toString()}
            data={MEDITATION_DATA}
            className="mb-28"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    console.log(item.id);
                  }}
                  className="h-48 my-3 overflow-hidden"
                >
                  <ImageBackground
                    source={MEDITATION_IMAGES[item.id - 1]}
                    resizeMode="cover"
                    className="flex-1 rounded-lg justify-center"
                  >
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      className="flex-1 justify-center items-center"
                    >
                      <Text className="text-gray-100 text-3xl text-center font-bold ">
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </ImageBackground>
                </Pressable>
              );
            }}
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
