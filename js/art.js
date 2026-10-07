/* ==========================================================================
   Flower Delivery — SVG Scene Artwork Generators
   Builds rich inline SVGs with coordinated IDs for GSAP timelines.
   ========================================================================== */
(function (FD) {
  'use strict';

  FD.art = {
    /** Exterior scene: Sky, clouds, cottage house, driveway, animated delivery van, and "pakeett" bubble */
    getExteriorSceneSvg: function () {
      return `
<svg class="scene-art" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
  <defs>
    <linearGradient id="ext-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCD5CE"/>
      <stop offset="45%" stop-color="#FDE2E4"/>
      <stop offset="80%" stop-color="#FFF1E6"/>
      <stop offset="100%" stop-color="#FAD2E1"/>
    </linearGradient>
    <radialGradient id="ext-sun" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFE5D9" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#FFCAD4" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFCAD4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ext-ground" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A3B18A"/>
      <stop offset="100%" stop-color="#588157"/>
    </linearGradient>
    <linearGradient id="ext-road" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E9D8A6"/>
      <stop offset="100%" stop-color="#DDA15E"/>
    </linearGradient>
    <filter id="shadow-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#4A3428" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Sky & Ambient Sun -->
  <rect x="0" y="0" width="600" height="800" fill="url(#ext-sky)"/>
  <circle cx="480" cy="180" r="160" fill="url(#ext-sun)"/>

  <!-- Soft Illustrated Clouds -->
  <g fill="#FFFDF9" opacity="0.65">
    <path d="M40,150 Q70,120 110,140 Q150,110 180,140 Q210,130 230,160 Q130,170 40,150 Z"/>
    <path d="M340,110 Q370,85 410,105 Q450,75 480,105 Q510,95 530,125 Q430,135 340,110 Z"/>
  </g>

  <!-- Background Hillside & Trees -->
  <path d="M0,480 Q180,410 360,450 Q480,420 600,440 L600,800 L0,800 Z" fill="url(#ext-ground)"/>

  <!-- Background Trees -->
  <g id="ext-trees">
    <!-- Tree 1 Left -->
    <path d="M50,470 L50,420" stroke="#7F4F24" stroke-width="8" stroke-linecap="round"/>
    <circle cx="50" cy="380" r="42" fill="#52796F"/>
    <circle cx="35" cy="390" r="30" fill="#354F52"/>
    <circle cx="65" cy="375" r="32" fill="#84A98C"/>

    <!-- Tree 2 Far Left -->
    <circle cx="110" cy="410" r="34" fill="#354F52"/>
    <circle cx="125" cy="405" r="28" fill="#52796F"/>

    <!-- Tree 3 Far Right -->
    <path d="M540,460 L540,390" stroke="#7F4F24" stroke-width="9" stroke-linecap="round"/>
    <circle cx="540" cy="360" r="46" fill="#354F52"/>
    <circle cx="560" cy="370" r="34" fill="#52796F"/>
    <circle cx="520" cy="355" r="35" fill="#84A98C"/>
  </g>

  <!-- House on Hilltop -->
  <g id="ext-house" transform="translate(140, 260)" filter="url(#shadow-filter)">
    <!-- House Body -->
    <rect x="40" y="100" width="240" height="170" rx="6" fill="#FFFDF9"/>
    <!-- Gable Roof -->
    <polygon points="160,10 15,110 305,110" fill="#E76F51"/>
    <polygon points="160,2 2,112 16,116 160,16 304,116 318,112" fill="#9C3A20"/>

    <!-- Chimney & Smoke -->
    <rect x="235" y="30" width="28" height="50" fill="#B24930"/>
    <g fill="#FFFDF9" opacity="0.7">
      <circle cx="249" cy="18" r="8"/>
      <circle cx="255" cy="5" r="11"/>
    </g>

    <!-- Attic Window -->
    <circle cx="160" cy="65" r="16" fill="#FFEAA7"/>
    <circle cx="160" cy="65" r="16" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>

    <!-- Front Doorway -->
    <rect x="130" y="170" width="60" height="100" rx="30" rx-y="30" fill="#E2C9B4"/>
    <path d="M135,195 C135,180 145,175 160,175 C175,175 185,180 185,195 L185,270 L135,270 Z" fill="#B86B53"/>
    <circle cx="142" cy="235" r="3" fill="#FFD166"/>

    <!-- Windows with Warm Lamp Light -->
    <g transform="translate(58, 155)">
      <rect x="0" y="0" width="48" height="62" rx="4" fill="#FFFDF9" stroke="#E2CDBA" stroke-width="3"/>
      <rect x="4" y="4" width="40" height="54" rx="2" fill="#FFE8B2"/>
      <line x1="24" y1="4" x2="24" y2="58" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="4" y1="31" x2="44" y2="31" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Flower Box -->
      <rect x="-2" y="58" width="52" height="10" rx="2" fill="#8C533E"/>
      <circle cx="8" cy="57" r="4.5" fill="#FF758F"/><circle cx="20" cy="56" r="5" fill="#FFD166"/><circle cx="34" cy="57" r="4.5" fill="#FF758F"/>
    </g>

    <g transform="translate(214, 155)">
      <rect x="0" y="0" width="48" height="62" rx="4" fill="#FFFDF9" stroke="#E2CDBA" stroke-width="3"/>
      <rect x="4" y="4" width="40" height="54" rx="2" fill="#FFE8B2"/>
      <line x1="24" y1="4" x2="24" y2="58" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="4" y1="31" x2="44" y2="31" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Flower Box -->
      <rect x="-2" y="58" width="52" height="10" rx="2" fill="#8C533E"/>
      <circle cx="8" cy="57" r="4.5" fill="#FF758F"/><circle cx="22" cy="56" r="5" fill="#FFD166"/><circle cx="36" cy="57" r="4.5" fill="#FF758F"/>
    </g>

    <!-- Warm Porch Lantern -->
    <circle cx="160" cy="155" r="28" fill="#FFEAA7" opacity="0.4"/>
    <circle cx="160" cy="155" r="4" fill="#FFB703"/>
  </g>

  <!-- Pathway from House to Driveway -->
  <path d="M290,530 Q270,580 230,640 L350,650 Q310,580 310,530 Z" fill="#E8D5B7" opacity="0.9"/>

  <!-- Driveway / Road Surface in Foreground -->
  <path d="M-20,630 Q260,610 620,630 L620,820 L-20,820 Z" fill="url(#ext-road)"/>
  <!-- Road Curbs & Grass Rim -->
  <path d="M-20,630 Q260,610 620,630" fill="none" stroke="#CCD5AE" stroke-width="6"/>

  <!-- DELIVERY VAN GROUP (Starts Offscreen Left and Drives In on road via GSAP) -->
  <g id="delivery-van-wrap" style="opacity: 0; visibility: hidden;">
    <!-- Van Shadow -->
    <ellipse cx="140" cy="162" rx="115" ry="12" fill="#4A3428" opacity="0.32"/>

    <!-- Van Body -->
    <g id="van-chassis">
      <!-- Upper Cream Cabin -->
      <path d="M40,110 L40,75 C40,55 55,42 75,42 L180,42 C205,42 225,58 238,82 L248,102 C252,108 252,110 252,110 Z" fill="#FFFDF9"/>
      <!-- Lower Coral Body -->
      <path d="M38,108 L254,108 C256,108 258,112 258,118 L256,138 C256,145 250,150 242,150 L212,150 C212,130 188,130 188,150 L108,150 C108,130 84,130 84,150 L48,150 C40,150 36,144 36,136 L36,114 C36,110 37,108 38,108 Z" fill="#E63956"/>
      <line x1="38" y1="108" x2="254" y2="108" stroke="#D3B89D" stroke-width="2.5"/>

      <!-- Windows -->
      <path d="M210,50 L234,80 C238,86 238,98 238,98 L202,98 L202,50 Z" fill="#CFE0FA"/>
      <rect x="150" y="50" width="46" height="48" rx="6" fill="#CFE0FA"/>
      <rect x="52" y="52" width="86" height="44" rx="8" fill="#F4ECE1"/>

      <!-- Van Flower Express Emblem -->
      <g transform="translate(95, 74)">
        <path d="M0,0 C-6,-5 -8,-14 0,-18 C8,-14 6,-5 0,0 Z" fill="#E63956"/>
        <path d="M0,0 L0,6" stroke="#4F772D" stroke-width="1.8"/>
        <text x="14" y="-3" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#6B3A28" letter-spacing="0.5">FLOWER</text>
        <text x="14" y="6" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="#8C5845" letter-spacing="1.5">DELIVERY</text>
      </g>

      <!-- Headlight Beam -->
      <polygon points="256,114 300,105 300,135 256,126" fill="#FFF3B0" opacity="0.6"/>
      <circle cx="255" cy="120" r="5" fill="#FFEAA7"/>
      <!-- Bumpers -->
      <rect x="250" y="136" width="12" height="10" rx="3" fill="#C5BAAF"/>
      <rect x="30" y="136" width="10" height="10" rx="3" fill="#C5BAAF"/>
    </g>

    <!-- Wheels (Independent groups for spinning) -->
    <g id="van-wheel-back" transform="translate(96, 150)">
      <circle cx="0" cy="0" r="22" fill="#36312D"/>
      <circle cx="0" cy="0" r="14" fill="#E6DCCE"/>
      <circle cx="0" cy="0" r="5" fill="#E63956"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#8A7E72" stroke-width="2"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#8A7E72" stroke-width="2"/>
    </g>
    <g id="van-wheel-front" transform="translate(200, 150)">
      <circle cx="0" cy="0" r="22" fill="#36312D"/>
      <circle cx="0" cy="0" r="14" fill="#E6DCCE"/>
      <circle cx="0" cy="0" r="5" fill="#E63956"/>
      <line x1="-12" y1="0" x2="12" y2="0" stroke="#8A7E72" stroke-width="2"/>
      <line x1="0" y1="-12" x2="0" y2="12" stroke="#8A7E72" stroke-width="2"/>
    </g>

    <!-- "pakeett" SPEECH BUBBLE (Pop animation via GSAP) -->
    <g id="delivery-bubble" transform="translate(140, 0)" style="opacity: 0; visibility: hidden;">
      <g filter="url(#shadow-filter)">
        <!-- Bubble Body -->
        <rect x="-65" y="-36" width="130" height="42" rx="21" fill="#FFFFFF"/>
        <!-- Tail pointing down to van window -->
        <polygon points="-8,6 8,6 0,16" fill="#FFFFFF"/>
        <!-- Text: pakeett (Required: exact lowercase) -->
        <text x="0" y="-10" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" fill="#E63956" text-anchor="middle" letter-spacing="1">pakeett</text>
      </g>
    </g>
  </g>
</svg>`;
    },

    /** Interior scene: Cozy room, wooden floorboards, opening 3D front door, and resting package */
    getInteriorSceneSvg: function () {
      return `
<svg class="scene-art" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
  <defs>
    <linearGradient id="int-wall" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCEEE9"/>
      <stop offset="60%" stop-color="#F8E5DC"/>
      <stop offset="100%" stop-color="#EED6CA"/>
    </linearGradient>
    <linearGradient id="int-floor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C58B58"/>
      <stop offset="100%" stop-color="#9C6234"/>
    </linearGradient>
    <linearGradient id="int-door-wood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D78F5A"/>
      <stop offset="50%" stop-color="#BF7846"/>
      <stop offset="100%" stop-color="#A56032"/>
    </linearGradient>
    <radialGradient id="doorway-sunlight" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF5EB" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="#FED7AA" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FDBA74" stop-opacity="0.2"/>
    </radialGradient>
    <filter id="int-drop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#4A2E1B" flood-opacity="0.22"/>
    </filter>
  </defs>

  <!-- Cozy Wall & Ambient Tone -->
  <rect x="0" y="0" width="600" height="800" fill="url(#int-wall)"/>

  <!-- Wallpaper Vertical Stripes Accent -->
  <g stroke="#F3DDD2" stroke-width="2" opacity="0.6">
    <line x1="60" y1="0" x2="60" y2="520"/>
    <line x1="120" y1="0" x2="120" y2="520"/>
    <line x1="480" y1="0" x2="480" y2="520"/>
    <line x1="540" y1="0" x2="540" y2="520"/>
  </g>

  <!-- Wooden Floorboards in Perspective -->
  <polygon points="0,520 600,520 600,800 0,800" fill="url(#int-floor)"/>
  <!-- Floorboard Planks -->
  <line x1="0" y1="520" x2="600" y2="520" stroke="#7A4B27" stroke-width="4"/>
  <line x1="100" y1="520" x2="40" y2="800" stroke="#7A4B27" stroke-width="1.8" opacity="0.6"/>
  <line x1="220" y1="520" x2="180" y2="800" stroke="#7A4B27" stroke-width="1.8" opacity="0.6"/>
  <line x1="380" y1="520" x2="420" y2="800" stroke="#7A4B27" stroke-width="1.8" opacity="0.6"/>
  <line x1="500" y1="520" x2="560" y2="800" stroke="#7A4B27" stroke-width="1.8" opacity="0.6"/>

  <!-- Baseboard Trim -->
  <rect x="0" y="505" width="600" height="15" fill="#E2C9B4"/>
  <line x1="0" y1="505" x2="600" y2="505" stroke="#BA987C" stroke-width="2"/>

  <!-- Decorative Wall Picture Frame (Left) -->
  <g transform="translate(60, 220)">
    <rect x="0" y="0" width="80" height="100" rx="4" fill="#FFFDF9" stroke="#9C6234" stroke-width="6" filter="url(#int-drop)"/>
    <!-- Minimalist botanic artwork -->
    <path d="M40,80 Q35,50 40,25" stroke="#52796F" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="25" r="8" fill="#FF758F"/>
    <ellipse cx="32" cy="45" rx="7" ry="4" fill="#84A98C" transform="rotate(-30 32 45)"/>
    <ellipse cx="48" cy="60" rx="7" ry="4" fill="#84A98C" transform="rotate(30 48 60)"/>
  </g>

  <!-- Potted Plant (Right Corner) -->
  <g transform="translate(480, 420)">
    <!-- Terracotta Pot -->
    <polygon points="15,70 55,70 48,110 22,110" fill="#D96B5B"/>
    <rect x="11" y="62" width="48" height="10" rx="2" fill="#B24930"/>
    <!-- Lush Leaves -->
    <path d="M35,65 Q10,30 2,10 Q25,35 35,65" fill="#3A5A40"/>
    <path d="M35,65 Q35,15 35,0 Q45,25 35,65" fill="#588157"/>
    <path d="M35,65 Q60,30 70,12 Q48,38 35,65" fill="#3A5A40"/>
    <path d="M35,65 Q20,45 8,40 Q25,52 35,65" fill="#588157"/>
    <path d="M35,65 Q50,45 62,42 Q48,52 35,65" fill="#84A98C"/>
  </g>

  <!-- Cozy Woven Welcome Mat / Rug -->
  <ellipse cx="300" cy="565" rx="140" ry="42" fill="#E8D5B7"/>
  <ellipse cx="300" cy="565" rx="136" ry="38" fill="none" stroke="#CBB191" stroke-width="3" stroke-dasharray="6,4"/>

  <!-- FRONT DOORWAY ARCH & FRAME -->
  <g id="interior-doorframe" transform="translate(190, 110)">
    <!-- Deep Door Frame Arch -->
    <path d="M0,410 L0,110 C0,50 50,0 110,0 C170,0 220,50 220,110 L220,410 Z" fill="#4A3428"/>
    <!-- Doorway threshold (Outside sunny view visible when door opens) -->
    <path d="M12,410 L12,115 C12,60 56,12 110,12 C164,12 208,60 208,115 L208,410 Z" fill="url(#doorway-sunlight)"/>

    <!-- Distant outdoor garden green through open door -->
    <path d="M12,340 Q110,320 208,340 L208,410 L12,410 Z" fill="#84A98C" opacity="0.8"/>

    <!-- FRONT DOOR (Anchored on Left Hinge; GSAP swings this open in 3D!) -->
    <g id="interior-door" style="transform-origin: 12px 200px;">
      <!-- Door Body with Arch -->
      <path d="M12,410 L12,115 C12,60 56,12 110,12 C164,12 208,60 208,115 L208,410 Z" fill="url(#int-door-wood)"/>
      <path d="M12,115 C12,60 56,12 110,12 C164,12 208,60 208,115 L208,410 L12,410 Z" fill="none" stroke="#8D4C22" stroke-width="3"/>

      <!-- Raised Door Moulding Panels -->
      <path d="M30,130 C30,85 65,50 110,50 C155,50 190,85 190,130 L190,230 L30,230 Z" fill="#B06A3B" stroke="#7A3D18" stroke-width="2"/>
      <rect x="30" y="250" width="160" height="140" rx="4" fill="#B06A3B" stroke="#7A3D18" stroke-width="2"/>

      <!-- Inner Recessed Panels -->
      <rect x="44" y="264" width="60" height="112" rx="3" fill="#9C5A2B"/>
      <rect x="116" y="264" width="60" height="112" rx="3" fill="#9C5A2B"/>

      <!-- Brass Doorknob -->
      <circle cx="34" cy="245" r="7" fill="#FFD166" filter="url(#int-drop)"/>
      <circle cx="34" cy="245" r="3.5" fill="#FFEAA7"/>
    </g>

    <!-- Outer Decorative Arch Trim -->
    <path d="M0,410 L0,110 C0,50 50,0 110,0 C170,0 220,50 220,110 L220,410 L208,410 L208,115 C208,60 164,12 110,12 C56,12 12,60 12,115 L12,410 Z" fill="#E2C9B4"/>
  </g>

  <!-- ENTRANCE PACKAGE (GSAP moves it from doorway to resting spot on rug) -->
  <g id="interior-package-wrap" style="opacity: 0; visibility: hidden;">
    <!-- Package Shadow -->
    <ellipse cx="160" cy="245" rx="110" ry="22" fill="#3D2618" opacity="0.38" filter="blur(6px)"/>

    <!-- Box Base -->
    <g id="int-box-base" filter="url(#int-drop)">
      <path d="M60,135 L260,135 L252,240 L68,240 Z" fill="#C59B70"/>
      <line x1="60" y1="135" x2="68" y2="240" stroke="#AA7E53" stroke-width="2"/>
      <line x1="260" y1="135" x2="252" y2="240" stroke="#AA7E53" stroke-width="2"/>
      <line x1="68" y1="240" x2="252" y2="240" stroke="#8D6238" stroke-width="2.5"/>
      <rect x="148" y="135" width="24" height="105" fill="#E63956"/>

      <!-- Postage Heart Stamp -->
      <g transform="translate(85, 155)">
        <rect x="0" y="0" width="46" height="34" rx="4" fill="#FFF9F2" stroke="#E2CDBA" stroke-width="1.5"/>
        <path d="M23,10 C20,7 15,9 15,13 C15,17 23,22 23,22 C23,22 31,17 31,13 C31,9 26,7 23,10 Z" fill="#E63956"/>
      </g>

      <!-- Label -->
      <g transform="translate(182, 175) rotate(-6)">
        <rect x="0" y="0" width="52" height="28" rx="3" fill="#FFE8D6" stroke="#DDB892" stroke-width="1"/>
        <text x="26" y="18" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#7F4F24" text-anchor="middle" letter-spacing="1">FOR YOU</text>
      </g>
    </g>

    <!-- Box Lid (Lifts off on tap) -->
    <g id="int-box-lid" filter="url(#int-drop)">
      <path d="M48,95 L272,95 L266,136 L54,136 Z" fill="#BC9368"/>
      <path d="M48,95 L75,70 L245,70 L272,95 Z" fill="#D9B48F"/>
      <path d="M54,136 L266,136 L263,142 L57,142 Z" fill="#996E44"/>
      <path d="M148,70 L172,70 L172,136 L148,136 Z" fill="#E63956"/>
      <!-- Bow -->
      <g transform="translate(160, 68)">
        <path d="M0,2 C-25,-18 -38,5 -8,2 Z" fill="#E63956"/>
        <path d="M0,2 C25,-18 38,5 8,2 Z" fill="#E63956"/>
        <circle cx="0" cy="2" r="6" fill="#C9184A"/>
        <circle cx="0" cy="2" r="3.5" fill="#FF85A1"/>
      </g>
    </g>
  </g>
</svg>`;
    }
  };
})(window.FD);
