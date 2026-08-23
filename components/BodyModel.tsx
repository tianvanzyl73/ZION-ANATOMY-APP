import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, StyleSheet, View, Text, Platform } from 'react-native';
import Svg, { Circle, Ellipse, Rect, Path, G, Defs, RadialGradient, Stop, Line } from 'react-native-svg';
import { REGIONS } from '../lib/data/systems';
import { Domain } from '../lib/types';
import { useTheme } from '../lib/themeContext';

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

interface Props {
  system: Domain | 'none';
  selectedRegion: string | null;
  onSelectRegion: (id: string) => void;
  height?: number;
}

const SYS_COLORS: Record<string, string> = {
  skeletal: '#E8E3D5',
  muscular: '#D9635C',
  nervous: '#E7C67C',
  cardiovascular: '#E05252',
  respiratory: '#6FB8E8',
  digestive: '#E0A45E',
  endocrine: '#A982E0',
  immune: '#6FBF8F',
  urinary: '#C3D45C',
  reproductive: '#E090BC',
  integumentary: '#D8A87A',
};

export default function BodyModel({ system, selectedRegion, onSelectRegion, height = 420 }: Props) {
  const { theme } = useTheme();
  const pulse = useRef(new Animated.Value(0)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(bodyOpacity, { toValue: 1, duration: 700, useNativeDriver: false }).start();
  }, [bodyOpacity]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1100, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 0, duration: 900, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const color = system === 'none' ? theme.accent : SYS_COLORS[system] ?? theme.accent;

  const skinFill = theme.dark ? '#14141A' : '#F4F2EC';
  const skinStroke = theme.dark ? '#2B2B36' : '#DAD7CC';
  const glow = theme.dark ? 'rgba(212,175,55,0.16)' : 'rgba(168,134,43,0.10)';

  const body = useMemo(
    () => (
      <G>
        {/* head */}
        <Ellipse cx={150} cy={42} rx={16} ry={20} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.4} />
        {/* neck */}
        <Rect x={143} y={58} width={14} height={14} rx={5} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* shoulders */}
        <Rect x={106} y={72} width={88} height={18} rx={9} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* torso */}
        <Rect x={118} y={84} width={64} height={62} rx={17} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* waist */}
        <Rect x={124} y={140} width={52} height={20} rx={10} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* pelvis */}
        <Ellipse cx={150} cy={175} rx={27} ry={18} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* arms */}
        <Rect x={99} y={78} width={16} height={56} rx={8} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={185} y={78} width={16} height={56} rx={8} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={97} y={132} width={14} height={52} rx={7} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={189} y={132} width={14} height={52} rx={7} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Ellipse cx={104} cy={194} rx={8} ry={11} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Ellipse cx={196} cy={194} rx={8} ry={11} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        {/* legs */}
        <Rect x={131} y={184} width={18} height={66} rx={9} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={151} y={184} width={18} height={66} rx={9} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={134} y={248} width={13} height={60} rx={6.5} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Rect x={153} y={248} width={13} height={60} rx={6.5} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Ellipse cx={140} cy={313} rx={10} ry={6} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
        <Ellipse cx={160} cy={313} rx={10} ry={6} fill="url(#skinGrad)" stroke={skinStroke} strokeWidth={1.2} />
      </G>
    ),
    [skinStroke],
  );

  const overlay = useMemo(() => {
    if (system === 'none') return null;
    const c = SYS_COLORS[system] ?? '#D4AF37';
    const fill = c;
    const soft = c + '99';
    const verySoft = c + '55';
    switch (system) {
      case 'skeletal':
        return (
          <G>
            <Ellipse cx={150} cy={41} rx={12} ry={15} fill={soft} stroke={c} strokeWidth={1.2} />
            <Path d="M141 52 L159 52 L156 60 L144 60 Z" fill={soft} stroke={c} strokeWidth={0.9} />
            {Array.from({ length: 12 }).map((_, i) => (
              <Rect key={i} x={145 - (i % 3 === 0 ? 1 : 0)} y={70 + i * 9} width={10} height={7} rx={2} fill={i % 2 ? soft : fill} stroke={c} strokeWidth={0.7} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <G key={`rib${i}`}>
                <Path d={`M${143 - i * 0.5} ${84 + i * 11} q-22 ${2 + i * 2} -20 ${9 + i}`} stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round" />
                <Path d={`M${157 + i * 0.5} ${84 + i * 11} q22 ${2 + i * 2} 20 ${9 + i}`} stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round" />
              </G>
            ))}
            <Rect x={145} y={92} width={10} height={42} rx={3} fill={soft} stroke={c} strokeWidth={0.9} />
            <Line x1={114} y1={78} x2={186} y2={78} stroke={c} strokeWidth={3} strokeLinecap="round" />
            <Rect x={106} y={82} width={12} height={52} rx={5} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={182} y={82} width={12} height={52} rx={5} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={104} y={136} width={10} height={50} rx={4} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={186} y={136} width={10} height={50} rx={4} fill={verySoft} stroke={c} strokeWidth={1} />
            <Path d="M128 160 q22 -10 44 0 l4 10 q-26 12 -52 0 Z" fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={133} y={184} width={13} height={64} rx={5} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={154} y={184} width={13} height={64} rx={5} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={136} y={250} width={9} height={56} rx={4} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={155} y={250} width={9} height={56} rx={4} fill={verySoft} stroke={c} strokeWidth={1} />
            <Rect x={153} y={193} width={10} height={6} rx={2} fill={fill} stroke={c} strokeWidth={0.8} />
          </G>
        );
      case 'muscular':
        return (
          <G>
            <Path d="M132 84 q18 -8 36 0 l-6 24 q-12 8 -24 0 Z" fill={soft} stroke={c} strokeWidth={1} />
            <Path d="M126 90 q-14 2 -18 12 l6 22 q10 -4 14 -14 Z" fill={soft} stroke={c} strokeWidth={1} />
            <Path d="M174 90 q14 2 18 12 l-6 22 q-10 -4 -14 -14 Z" fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={103} y={82} width={15} height={26} rx={7} fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={182} y={82} width={15} height={26} rx={7} fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={100} y={110} width={13} height={30} rx={6} fill={verySoft} stroke={c} strokeWidth={0.9} />
            <Rect x={187} y={110} width={13} height={30} rx={6} fill={verySoft} stroke={c} strokeWidth={0.9} />
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <Rect key={`ab${row}${col}`} x={138 + col * 13} y={120 + row * 13} width={11} height={10} rx={3} fill={soft} stroke={c} strokeWidth={0.8} />
              )),
            )}
            <Path d="M126 150 q24 12 48 0" stroke={c} strokeWidth={2.4} fill="none" />
            <Rect x={132} y={186} width={16} height={40} rx={8} fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={152} y={186} width={16} height={40} rx={8} fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={132} y={228} width={16} height={20} rx={7} fill={verySoft} stroke={c} strokeWidth={0.9} />
            <Rect x={152} y={228} width={16} height={20} rx={7} fill={verySoft} stroke={c} strokeWidth={0.9} />
            <Rect x={135} y={252} width={11} height={34} rx={5} fill={soft} stroke={c} strokeWidth={1} />
            <Rect x={154} y={252} width={11} height={34} rx={5} fill={soft} stroke={c} strokeWidth={1} />
            <Ellipse cx={140} cy={292} rx={7} ry={11} fill={soft} stroke={c} strokeWidth={1} />
            <Ellipse cx={160} cy={292} rx={7} ry={11} fill={soft} stroke={c} strokeWidth={1} />
          </G>
        );
      case 'nervous':
        return (
          <G>
            <Path d="M138 32 q12 -12 24 0 q4 12 -3 18 q-9 6 -18 0 q-7 -6 -3 -18 Z" fill={soft} stroke={c} strokeWidth={1.2} />
            <Path d="M141 27 q3 -8 9 -8 q6 0 9 8" stroke={c} strokeWidth={1.4} fill="none" />
            <Rect x={146} y={52} width={8} height={8} rx={2} fill={fill} stroke={c} strokeWidth={0.9} />
            <Rect x={147} y={62} width={6} height={196} rx={3} fill={soft} stroke={c} strokeWidth={1} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <G key={`n${i}`}>
                <Line x1={147} y1={80 + i * 22} x2={118 - i} y2={86 + i * 22} stroke={c} strokeWidth={1.3} opacity={0.85} />
                <Line x1={153} y1={80 + i * 22} x2={182 + i} y2={86 + i * 22} stroke={c} strokeWidth={1.3} opacity={0.85} />
              </G>
            ))}
            <Line x1={150} y1={240} x2={150} y2={300} stroke={c} strokeWidth={2} opacity={0.8} />
          </G>
        );
      case 'cardiovascular':
        return (
          <G>
            <Path d="M150 30 q-12 0 -12 10 q0 6 12 6 q12 0 12 -6 q0 -10 -12 -10 Z" fill={verySoft} stroke={c} strokeWidth={0.9} opacity={0.6} />
            <Path d="M150 20 l-3 8 h6 Z" fill={fill} opacity={0.5} />
            <Path d="M140 100 q10 -6 20 0 l-4 16 q-6 4 -12 0 Z" fill={fill} stroke={c} strokeWidth={1.1} />
            <Path d="M150 96 v-24" stroke={c} strokeWidth={3} strokeLinecap="round" />
            <Path d="M150 76 q-14 -6 -22 6" stroke={c} strokeWidth={3.4} fill="none" strokeLinecap="round" />
            <Path d="M150 78 q16 -4 22 8" stroke={c} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.8} />
            {[0, 1, 2, 3, 4].map((i) => (
              <G key={`cv${i}`}>
                <Path d={`M136 ${106 + i * 12} q-16 ${4 + i * 3} -26 ${2}`} stroke={fill} strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.9} />
                <Path d={`M164 ${106 + i * 12} q16 ${4 + i * 3} 26 ${2}`} stroke={fill} strokeWidth={1.6} fill="none" strokeLinecap="round" opacity={0.9} />
              </G>
            ))}
            <Path d="M138 140 q-16 30 -6 66" stroke={c} strokeWidth={2.6} fill="none" opacity={0.75} strokeLinecap="round" />
            <Path d="M162 140 q16 30 6 66" stroke={c} strokeWidth={2.6} fill="none" opacity={0.75} strokeLinecap="round" />
            <Path d="M132 210 q-6 50 4 84" stroke={fill} strokeWidth={2} fill="none" opacity={0.6} />
            <Path d="M168 210 q6 50 -4 84" stroke={fill} strokeWidth={2} fill="none" opacity={0.6} />
            <Path d="M110 96 q-12 40 -8 92 M190 96 q12 40 8 92" stroke={fill} strokeWidth={2} fill="none" opacity={0.55} />
          </G>
        );
      case 'respiratory':
        return (
          <G>
            <Path d="M150 62 l0 22" stroke={c} strokeWidth={4} strokeLinecap="round" />
            <Path d="M150 84 l-14 10 M150 84 l14 10" stroke={c} strokeWidth={3} strokeLinecap="round" />
            <Path d="M136 96 q-16 6 -16 26 q0 26 14 30 q8 2 8 -12 l0 -40 Z" fill={soft} stroke={c} strokeWidth={1.2} />
            <Path d="M164 96 q16 6 16 26 q0 26 -14 30 q-8 2 -8 -12 l0 -40 Z" fill={soft} stroke={c} strokeWidth={1.2} />
            {Array.from({ length: 7 }).map((_, i) => (
              <G key={`al${i}`}>
                <Circle cx={130 - (i % 3) * 4} cy={104 + i * 7} r={2} fill={c} opacity={0.75} />
                <Circle cx={170 + (i % 3) * 4} cy={104 + i * 7} r={2} fill={c} opacity={0.75} />
              </G>
            ))}
            <Path d="M126 148 q24 10 48 0 q-24 14 -48 0 Z" fill={fill} stroke={c} strokeWidth={1.2} />
          </G>
        );
      case 'digestive':
        return (
          <G>
            <Line x1={150} y1={62} x2={150} y2={92} stroke={c} strokeWidth={2.4} />
            <Path d="M150 92 q-22 0 -22 18 q0 16 14 16 q10 0 10 -12 l0 -22 Z" fill={soft} stroke={c} strokeWidth={1.2} />
            <Path d="M124 104 q20 -10 30 2 q-8 8 -30 4 Z" fill={fill} stroke={c} strokeWidth={1} opacity={0.9} />
            <G opacity={0.95}>
              <Path d="M128 130 q22 -8 44 0 q-6 12 -22 10 q-16 2 -22 -10 Z" fill={verySoft} stroke={c} strokeWidth={1.1} />
              <Path d="M130 142 q20 8 40 0 q-4 14 -20 12 q-16 2 -20 -12 Z" fill={verySoft} stroke={c} strokeWidth={1.1} />
              <Path d="M134 154 q16 8 32 0 q-4 14 -16 12 q-12 2 -16 -12 Z" fill={verySoft} stroke={c} strokeWidth={1.1} />
            </G>
            <Path d="M134 168 q16 10 32 0 q-2 12 -16 12 q-14 0 -16 -12 Z" fill={soft} stroke={c} strokeWidth={1.1} />
          </G>
        );
      case 'endocrine':
        return (
          <G>
            {[[150, 34, 5], [150, 62, 4], [150, 92, 4.5], [136, 130, 5], [164, 130, 5], [150, 122, 4], [150, 176, 5], [128, 158, 3.5], [172, 158, 3.5]].map(([x, y, r], i) => (
              <G key={`en${i}`}>
                <Circle cx={x} cy={y} r={r} fill={soft} stroke={c} strokeWidth={1.1} />
                <Circle cx={x} cy={y} r={r + 4} fill="none" stroke={c} strokeWidth={0.7} opacity={0.5} />
              </G>
            ))}
            <Line x1={150} y1={40} x2={150} y2={172} stroke={c} strokeWidth={1} opacity={0.35} strokeDasharray="3 3" />
          </G>
        );
      case 'immune':
        return (
          <G>
            <Path d="M144 80 q6 -10 12 0 q-6 8 -12 0 Z" fill={soft} stroke={c} strokeWidth={1} />
            {[[124, 92], [176, 92], [122, 110], [178, 110], [126, 128], [174, 128], [118, 146], [182, 146], [130, 168], [170, 168], [112, 190], [188, 190], [124, 210], [176, 210], [134, 240], [166, 240], [140, 275], [160, 275]].map(([x, y], i) => (
              <G key={`ly${i}`}>
                <Circle cx={x} cy={y} r={3.4} fill={c} opacity={0.85} />
                <Circle cx={x} cy={y} r={6} fill="none" stroke={c} strokeWidth={0.6} opacity={0.35} />
              </G>
            ))}
            <Ellipse cx={162} cy={124} rx={8} ry={11} fill={soft} stroke={c} strokeWidth={1.1} />
          </G>
        );
      case 'urinary':
        return (
          <G>
            {[[136, 128], [164, 128]].map(([x, y], i) => (
              <G key={`k${i}`}>
                <Path
                  d={i === 0 ? `M${x} ${y - 12} q10 4 6 22 q-4 6 -8 2 q-6 -12 2 -24 Z` : `M${x} ${y - 12} q-10 4 -6 22 q4 6 8 2 q6 -12 -2 -24 Z`}
                  fill={soft}
                  stroke={c}
                  strokeWidth={1.2}
                />
              </G>
            ))}
            <Path d="M138 138 q4 30 10 44" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
            <Path d="M162 138 q-4 30 -10 44" stroke={c} strokeWidth={2} fill="none" strokeLinecap="round" />
            <Path d="M140 182 q10 10 20 0 q6 14 -10 16 q-16 -2 -10 -16 Z" fill={fill} stroke={c} strokeWidth={1.2} />
          </G>
        );
      case 'reproductive':
        return (
          <G>
            <Path d="M142 196 q8 -6 16 0 l-4 22 q-4 6 -8 0 Z" fill={soft} stroke={c} strokeWidth={1.2} />
            <Circle cx={150} cy={192} r={5} fill={fill} stroke={c} strokeWidth={1} />
            <Ellipse cx={136} cy={192} rx={7} ry={5} fill={soft} stroke={c} strokeWidth={1} />
            <Ellipse cx={164} cy={192} rx={7} ry={5} fill={soft} stroke={c} strokeWidth={1} />
          </G>
        );
      case 'integumentary':
        return (
          <G>
            {Array.from({ length: 26 }).map((_, i) => {
              const x = 100 + (i % 13) * 8.3;
              const y = i < 13 ? 78 : 300;
              return <Circle key={`sw${i}`} cx={x} cy={y + (i % 2 ? 3 : 0)} r={1.6} fill={c} opacity={0.8} />;
            })}
            <Ellipse cx={150} cy={42} rx={17} ry={21} fill="none" stroke={c} strokeWidth={1.6} opacity={0.9} />
            <Ellipse cx={150} cy={42} rx={13} ry={17} fill="none" stroke={c} strokeWidth={0.8} opacity={0.5} />
          </G>
        );
      default:
        return null;
    }
  }, [system, theme.dark]);

  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <View
        style={{
          borderRadius: 26,
          overflow: 'hidden',
          backgroundColor: theme.bgElev,
          borderWidth: 1,
          borderColor: theme.border,
          width: '100%',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <Svg viewBox="0 0 300 340" style={{ width: '100%', height }}>
          <Defs>
            <RadialGradient id="skinGrad" cx="35%" cy="25%" r="95%">
              <Stop offset="0%" stopColor={theme.dark ? '#26262F' : '#FFFFFF'} />
              <Stop offset="60%" stopColor={theme.dark ? '#171720' : '#F7F5EF'} />
              <Stop offset="100%" stopColor={theme.dark ? '#101018' : '#EBE8DF'} />
            </RadialGradient>
            <RadialGradient id="halo" cx="50%" cy="40%" r="60%">
              <Stop offset="0%" stopColor={glow} />
              <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </RadialGradient>
          </Defs>
          <AnimatedEllipse cx={150} cy={170} rx={130} ry={165} fill="url(#halo)" opacity={bodyOpacity} />
          {body}
          {overlay}
          {REGIONS.map((r) => {
            const active = selectedRegion === r.id;
            const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.75] });
            return (
              <G key={r.id}>
                <Ellipse
                  cx={r.cx}
                  cy={r.cy}
                  rx={r.rx}
                  ry={r.ry}
                  fill={active ? (theme.dark ? 'rgba(212,175,55,0.20)' : 'rgba(168,134,43,0.14)') : 'transparent'}
                  stroke={active ? color : 'transparent'}
                  strokeWidth={1.6}
                  onPress={() => onSelectRegion(r.id)}
                />
                {active ? (
                  <AnimatedEllipse cx={r.cx} cy={r.cy} rx={r.rx + 6} ry={r.ry + 6} fill="none" stroke={color} strokeWidth={1.4} opacity={ringOpacity} />
                ) : null}
                {active ? <Circle cx={r.cx} cy={r.cy - r.ry - 10} r={3.4} fill={color} /> : null}
              </G>
            );
          })}
        </Svg>
        <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 1, paddingBottom: 6 }}>
          {system === 'none' ? 'TAP A REGION TO EXPLORE' : 'ANTERIOR VIEW · TAP A REGION'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
