/** @format */

import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  // const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // exit
    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(
    2,
    "0"
  );

  const formattedSeconds = String(Math.floor(secondsRemaining % 60)).padStart(
    2,
    "0"
  );

  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10);
    setIsMeditating(!isMeditating);
    await toggleSound();
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);
    return sound;
  };

  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            className="absolute top-16 left-6 z-10"
            onPress={() => router.back()}
          >
            <AntDesign name="leftcircleo" size={30} color={"white"} />
          </Pressable>
          <View className="flex-1 justify-center">
            <View className="mx-auto rounded-full bg-neutral-200 w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedMinutes}:{formattedSeconds}
              </Text>
            </View>
          </View>
          <View className="mb-5">
            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
            />
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
