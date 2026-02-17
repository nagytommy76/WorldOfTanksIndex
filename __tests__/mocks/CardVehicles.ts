import type { CardTanksType } from '@/types/VehicleDetails/Vehicle'

const mockVehicles = [
   {
      _id: '696b559aef3bb87118039d0f',
      id: 40977,
      name: 'Hirschkafer',
      nation: 'germany',
      type: 'AT-SPG',
      tags: [
         'AT-SPG',
         'role_ATSPG_sniper',
         'HD',
         'tankRammer_class1_user',
         'improvedVentilation_class2_user',
         'mediumAT-SPG',
         'AT-SPG1',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_medium_user',
         'earn_crystals',
      ],
      tier: 11,
      notInShop: false,
      price: 7400000,
      xmlId: 'G189_Hirschkafer',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G189_Hirschkafer.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G189_Hirschkafer.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G189_Hirschkafer.png',
         },
         short_name: 'Hirschkäfer',
         name: 'Hirschkäfer',
      },
   },
   {
      _id: '696b559aef3bb87118039cf8',
      id: 41745,
      name: 'Taschenratte',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_assault',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 11,
      notInShop: false,
      price: 7400000,
      xmlId: 'G187_Taschenratte',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G187_Taschenratte.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G187_Taschenratte.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G187_Taschenratte.png',
         },
         short_name: 'Taschenratte',
         name: 'Taschenratte',
      },
   },
   {
      _id: '696b559aef3bb87118039d04',
      id: 41233,
      name: 'LeKpz Borkenkafer',
      nation: 'germany',
      type: 'lightTank',
      tags: [
         'lightTank',
         'role_LT_universal',
         'HD',
         'scout',
         'improvedVentilation_class3_user',
         'tankRammer_class2_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class2_user',
         'antifragmentationLining_light_user',
         'earn_crystals',
      ],
      tier: 11,
      notInShop: false,
      price: 7400000,
      xmlId: 'G188_LeKpz_Borkenkafer',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G188_LeKpz_Borkenkafer.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G188_LeKpz_Borkenkafer.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G188_LeKpz_Borkenkafer.png',
         },
         short_name: 'Borkenkäfer',
         name: 'leKpz Borkenkäfer',
      },
   },
   {
      _id: '696b559aef3bb87118039ce1',
      id: 41489,
      name: 'Leopard 120 Verbessert',
      nation: 'germany',
      type: 'mediumTank',
      tags: [
         'mediumTank',
         'role_MT_sniper',
         'HD',
         'beast',
         'mediumTank1',
         'improvedVentilation_class2_user',
         'tankRammer_class2_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class2_user',
         'antifragmentationLining_medium_user',
         'earn_crystals',
      ],
      tier: 11,
      notInShop: false,
      price: 7400000,
      xmlId: 'G185_Leopard_120_Verbessert',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G185_Leopard_120_Verbessert.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G185_Leopard_120_Verbessert.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G185_Leopard_120_Verbessert.png',
         },
         short_name: 'Leopard 120',
         name: 'Leopard 120 Verbessert',
      },
   },
   {
      _id: '696b5598ef3bb87118039a91',
      id: 19217,
      name: 'Grille 15 L63',
      nation: 'germany',
      type: 'AT-SPG',
      tags: [
         'AT-SPG',
         'role_ATSPG_sniper',
         'HD',
         'mediumAT-SPG',
         'AT-SPG1',
         'tankRammer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_medium_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G121_Grille_15_L63',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G121_Grille_15_L63.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G121_Grille_15_L63.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G121_Grille_15_L63.png',
         },
         short_name: 'Grille 15',
         name: 'Grille 15',
      },
   },
   {
      _id: '696b559bef3bb8711803a046',
      id: 12049,
      name: 'JagdPz E100',
      nation: 'germany',
      type: 'AT-SPG',
      tags: [
         'AT-SPG',
         'role_ATSPG_assault',
         'HD',
         'heavyAT-SPG',
         'AT-SPG2',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G72_JagdPz_E100',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G72_JagdPz_E100.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G72_JagdPz_E100.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G72_JagdPz_E100.png',
         },
         short_name: 'Jg.Pz. E 100',
         name: 'Jagdpanzer E 100',
      },
   },
   {
      _id: '696b559bef3bb87118039fad',
      id: 9233,
      name: 'G E',
      nation: 'germany',
      type: 'SPG',
      tags: [
         'SPG',
         'role_SPG',
         'HD',
         'heavySPG',
         'tankRammer_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G61_G_E',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G61_G_E.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G61_G_E.png',
            big_icon: 'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G61_G_E.png',
         },
         short_name: 'G.W. E 100',
         name: 'G.W. E 100',
      },
   },
   {
      _id: '696b559bef3bb87118039e71',
      id: 6929,
      name: 'Maus',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_assault',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G42_Maus',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G42_Maus.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G42_Maus.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G42_Maus.png',
         },
         short_name: 'Maus',
         name: 'Maus',
      },
   },
   {
      _id: '696b559bef3bb87118039f63',
      id: 9489,
      name: 'E-100',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_assault',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G56_E-100',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G56_E-100.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G56_E-100.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G56_E-100.png',
         },
         short_name: 'E 100',
         name: 'E 100',
      },
   },
   {
      _id: '696b5598ef3bb87118039add',
      id: 19473,
      name: 'PzKpfw VII',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_assault',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G134_PzKpfw_VII',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G134_PzKpfw_VII.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G134_PzKpfw_VII.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G134_PzKpfw_VII.png',
         },
         short_name: 'Pz.Kpfw. VII',
         name: 'Pz.Kpfw. VII',
      },
   },
   {
      _id: '696b5598ef3bb87118039ab2',
      id: 19985,
      name: 'Spz 57 Rh',
      nation: 'germany',
      type: 'lightTank',
      tags: [
         'lightTank',
         'role_LT_universal',
         'HD',
         'scout',
         'improvedVentilation_class3_user',
         'tankRammer_class2_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class2_user',
         'antifragmentationLining_light_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G125_Spz_57_Rh',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G125_Spz_57_Rh.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G125_Spz_57_Rh.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G125_Spz_57_Rh.png',
         },
         short_name: 'Rhm. Pzw.',
         name: 'Rheinmetall Panzerwagen',
      },
   },
   {
      _id: '696b559cef3bb8711803a161',
      id: 14609,
      name: 'Leopard1',
      nation: 'germany',
      type: 'mediumTank',
      tags: [
         'mediumTank',
         'role_MT_sniper',
         'HD',
         'beast',
         'mediumTank1',
         'improvedVentilation_class2_user',
         'tankRammer_class2_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class2_user',
         'antifragmentationLining_medium_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G89_Leopard1',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G89_Leopard1.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G89_Leopard1.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G89_Leopard1.png',
         },
         short_name: 'Leopard 1',
         name: 'Leopard 1',
      },
   },
   {
      _id: '696b559bef3bb8711803a051',
      id: 12305,
      name: 'E50 Ausf M',
      nation: 'germany',
      type: 'mediumTank',
      tags: [
         'mediumTank',
         'role_MT_assault',
         'HD',
         'mediumTank3',
         'improvedVentilation_class2_user',
         'tankRammer_class2_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_medium_user',
         'earn_crystals',
      ],
      tier: 10,
      notInShop: false,
      price: 6100000,
      xmlId: 'G73_E50_Ausf_M',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G73_E50_Ausf_M.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G73_E50_Ausf_M.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G73_E50_Ausf_M.png',
         },
         short_name: 'E 50 M',
         name: 'E 50 Ausf. M',
      },
   },
   {
      _id: '696b559cef3bb8711803a1ef',
      id: 16401,
      name: 'Waffentrager IV',
      nation: 'germany',
      type: 'AT-SPG',
      tags: [
         'AT-SPG',
         'role_ATSPG_sniper',
         'HD',
         'mediumAT-SPG',
         'AT-SPG1',
         'tankRammer_class1_user',
         'extraHealthReserve_class2_user',
         'antifragmentationLining_medium_user',
      ],
      tier: 9,
      notInShop: false,
      price: 3400000,
      xmlId: 'G97_Waffentrager_IV',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G97_Waffentrager_IV.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G97_Waffentrager_IV.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G97_Waffentrager_IV.png',
         },
         short_name: 'WT auf Pz. IV',
         name: 'Waffenträger auf Pz. IV',
      },
   },
   {
      _id: '696b559bef3bb87118039e8d',
      id: 7953,
      name: 'JagdTiger',
      nation: 'germany',
      type: 'AT-SPG',
      tags: [
         'AT-SPG',
         'role_ATSPG_assault',
         'HD',
         'beast',
         'heavyAT-SPG',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
      ],
      tier: 9,
      notInShop: false,
      price: 3450000,
      xmlId: 'G44_JagdTiger',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G44_JagdTiger.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G44_JagdTiger.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G44_JagdTiger.png',
         },
         short_name: 'Jagdtiger',
         name: 'Jagdtiger',
      },
   },
   {
      _id: '696b559bef3bb87118039ea9',
      id: 8721,
      name: 'G Tiger',
      nation: 'germany',
      type: 'SPG',
      tags: [
         'SPG',
         'role_SPG',
         'HD',
         'beast',
         'heavySPG',
         'tankRammer_class1_user',
         'antifragmentationLining_heavy_user',
      ],
      tier: 9,
      notInShop: false,
      price: 3600000,
      xmlId: 'G45_G_Tiger',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G45_G_Tiger.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G45_G_Tiger.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G45_G_Tiger.png',
         },
         short_name: 'G.W. Tiger',
         name: 'G.W. Tiger',
      },
   },
   {
      _id: '696b5598ef3bb871180399c8',
      id: 18705,
      name: 'Typ 205',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_assault',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
      ],
      tier: 9,
      notInShop: false,
      price: 3580000,
      xmlId: 'G110_Typ_205',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G110_Typ_205.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G110_Typ_205.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G110_Typ_205.png',
         },
         short_name: 'Mäuschen',
         name: 'Mäuschen',
      },
   },
   {
      _id: '696b559bef3bb87118039f4d',
      id: 9745,
      name: 'E-75',
      nation: 'germany',
      type: 'heavyTank',
      tags: [
         'heavyTank',
         'role_HT_universal',
         'HD',
         'heavyTank1',
         'improvedVentilation_class1_user',
         'tankRammer_class1_user',
         'aimingStabilizer_class1_user',
         'extraHealthReserve_class1_user',
         'antifragmentationLining_superheavy_user',
      ],
      tier: 9,
      notInShop: false,
      price: 3480000,
      xmlId: 'G55_E-75',
      tankDetails: {
         images: {
            small_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/small/germany-G55_E-75.png',
            contour_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/contour/germany-G55_E-75.png',
            big_icon:
               'http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/vehicle/germany-G55_E-75.png',
         },
         short_name: 'E 75',
         name: 'E 75',
      },
   },
] as CardTanksType[]

export default mockVehicles
