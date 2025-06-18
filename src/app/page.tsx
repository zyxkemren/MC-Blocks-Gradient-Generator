// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";

type RGB = [number, number, number];

// ✅ Data Blok Minecraft dengan RGB
const blocks: { id: string; rgb: RGB; name: string }[] = [
  { id: "acacia_log.png", rgb: [105, 98, 88], name: "Acacia Log" },
  { id: "acacia_planks.png", rgb: [170, 91, 51], name: "Acacia Planks" },
  { id: "amethyst_block.png", rgb: [140, 104, 194], name: "Amethyst Block" },
  { id: "ancient_debris_side.png", rgb: [99, 71, 64], name: "Ancient Debris Side" },
  { id: "ancient_debris_top.png", rgb: [103, 80, 73], name: "Ancient Debris Top" },
  { id: "andesite.png", rgb: [137, 137, 138], name: "Andesite" },
  { id: "azalea_top.png", rgb: [103, 126, 48], name: "Azalea Top" },
  { id: "bamboo_block.png", rgb: [130, 147, 59], name: "Bamboo Block" },
  { id: "bamboo_block_top.png", rgb: [145, 146, 67], name: "Bamboo Block Top" },
  { id: "bamboo_planks.png", rgb: [196, 175, 82], name: "Bamboo Planks" },
  { id: "barrel_side.png", rgb: [116, 86, 52], name: "Barrel Side" },
  { id: "barrel_top.png", rgb: [136, 101, 59], name: "Barrel Top" },
  { id: "basalt_side.png", rgb: [76, 75, 79], name: "Basalt Side" },
  { id: "basalt_top.png", rgb: [86, 86, 89], name: "Basalt Top" },
  { id: "bedrock.png", rgb: [95, 95, 95], name: "Bedrock" },
  { id: "bee_nest_bottom.png", rgb: [166, 134, 93], name: "Bee Nest Bottom" },
  { id: "bee_nest_side.png", rgb: [203, 159, 82], name: "Bee Nest Side" },
  { id: "bee_nest_top.png", rgb: [211, 174, 81], name: "Bee Nest Top" },
  { id: "beehive_end.png", rgb: [181, 147, 91], name: "Beehive End" },
  { id: "beehive_side.png", rgb: [161, 130, 79], name: "Beehive Side" },
  { id: "birch_log.png", rgb: [224, 223, 219], name: "Birch Log" },
  { id: "birch_planks.png", rgb: [194, 177, 122], name: "Birch Planks" },
  { id: "birch_trapdoor.png", rgb: [212, 201, 169], name: "Birch Trapdoor" },
  { id: "black_concrete.png", rgb: [8, 10, 15], name: "Black Concrete" },
  { id: "black_concrete_powder.png", rgb: [27, 28, 33], name: "Black Concrete Powder" },
  { id: "black_glazed_terracotta.png", rgb: [89, 33, 36], name: "Black Glazed Terracotta" },
  { id: "black_shulker_box.png", rgb: [26, 26, 30], name: "Black Shulker Box" },
  { id: "black_terracotta.png", rgb: [37, 23, 16], name: "Black Terracotta" },
  { id: "black_wool.png", rgb: [22, 22, 27], name: "Black Wool" },
  { id: "blackstone.png", rgb: [44, 39, 46], name: "Blackstone" },
  { id: "blackstone_top.png", rgb: [44, 39, 47], name: "Blackstone Top" },
  { id: "blast_furnace_side.png", rgb: [114, 114, 114], name: "Blast Furnace Side" },
  { id: "blast_furnace_top.png", rgb: [83, 82, 83], name: "Blast Furnace Top" },
  { id: "blue_concrete.png", rgb: [45, 47, 143], name: "Blue Concrete" },
  { id: "blue_concrete_powder.png", rgb: [70, 74, 167], name: "Blue Concrete Powder" },
  { id: "blue_glazed_terracotta.png", rgb: [50, 77, 153], name: "Blue Glazed Terracotta" },
  { id: "blue_ice.png", rgb: [117, 168, 253], name: "Blue Ice" },
  { id: "blue_shulker_box.png", rgb: [44, 46, 141], name: "Blue Shulker Box" },
  { id: "blue_terracotta.png", rgb: [74, 60, 91], name: "Blue Terracotta" },
  { id: "blue_wool.png", rgb: [53, 58, 158], name: "Blue Wool" },
  { id: "bone_block_side.png", rgb: [229, 226, 208], name: "Bone Block Side" },
  { id: "bone_block_top.png", rgb: [210, 207, 181], name: "Bone Block Top" },
  { id: "bookshelf.png", rgb: [134, 108, 78], name: "Bookshelf" },
  { id: "brain_coral_block.png", rgb: [209, 96, 161], name: "Brain Coral Block" },
  { id: "bricks.png", rgb: [153, 101, 89], name: "Bricks" },
  { id: "brown_concrete.png", rgb: [96, 60, 32], name: "Brown Concrete" },
  { id: "brown_concrete_powder.png", rgb: [126, 85, 54], name: "Brown Concrete Powder" },
  { id: "brown_glazed_terracotta.png", rgb: [138, 110, 96], name: "Brown Glazed Terracotta" },
  { id: "brown_mushroom_block.png", rgb: [149, 112, 81], name: "Brown Mushroom Block" },
  { id: "brown_shulker_box.png", rgb: [107, 66, 36], name: "Brown Shulker Box" },
  { id: "brown_terracotta.png", rgb: [77, 51, 36], name: "Brown Terracotta" },
  { id: "brown_wool.png", rgb: [115, 72, 41], name: "Brown Wool" },
  { id: "bubble_coral_block.png", rgb: [168, 29, 164], name: "Bubble Coral Block" },
  { id: "budding_amethyst.png", rgb: [142, 105, 191], name: "Budding Amethyst" },
  { id: "calcite.png", rgb: [225, 226, 222], name: "Calcite" },
  { id: "cartography_table_side2.png", rgb: [99, 81, 74], name: "Cartography Table Side2" },
  { id: "carved_pumpkin.png", rgb: [168, 103, 24], name: "Carved Pumpkin" },
  { id: "cherry_log.png", rgb: [56, 34, 45], name: "Cherry Log" },
  { id: "cherry_planks.png", rgb: [227, 180, 174], name: "Cherry Planks" },
  { id: "chiseled_bookshelf_empty.png", rgb: [115, 91, 54], name: "Chiseled Bookshelf Empty" },
  { id: "chiseled_bookshelf_occupied.png", rgb: [141, 108, 84], name: "Chiseled Bookshelf Occupied" },
  { id: "chiseled_bookshelf_side.png", rgb: [177, 143, 88], name: "Chiseled Bookshelf Side" },
  { id: "chiseled_bookshelf_top.png", rgb: [179, 146, 90], name: "Chiseled Bookshelf Top" },
  { id: "chiseled_copper.png", rgb: [187, 103, 76], name: "Chiseled Copper" },
  { id: "chiseled_deepslate.png", rgb: [57, 57, 58], name: "Chiseled Deepslate" },
  { id: "chiseled_nether_bricks.png", rgb: [49, 24, 29], name: "Chiseled Nether Bricks" },
  { id: "chiseled_polished_blackstone.png", rgb: [57, 53, 62], name: "Chiseled Polished Blackstone" },
  { id: "chiseled_red_sandstone.png", rgb: [184, 98, 30], name: "Chiseled Red Sandstone" },
  { id: "chiseled_resin_bricks.png", rgb: [203, 91, 28], name: "Chiseled Resin Bricks" },
  { id: "chiseled_sandstone.png", rgb: [217, 204, 158], name: "Chiseled Sandstone" },
  { id: "chiseled_stone_bricks.png", rgb: [122, 121, 122], name: "Chiseled Stone Bricks" },
  { id: "chiseled_tuff.png", rgb: [92, 97, 90], name: "Chiseled Tuff" },
  { id: "chiseled_tuff_bricks_top.png", rgb: [113, 115, 108], name: "Chiseled Tuff Bricks Top" },
  { id: "clay.png", rgb: [161, 167, 180], name: "Clay" },
  { id: "coal_block.png", rgb: [18, 17, 17], name: "Coal Block" },
  { id: "coal_ore.png", rgb: [111, 111, 110], name: "Coal Ore" },
  { id: "coarse_dirt.png", rgb: [125, 90, 63], name: "Coarse Dirt" },
  { id: "cobbled_deepslate.png", rgb: [81, 81, 83], name: "Cobbled Deepslate" },
  { id: "cobblestone.png", rgb: [132, 132, 132], name: "Cobblestone" },
  { id: "composter_bottom.png", rgb: [119, 74, 35], name: "Composter Bottom" },
  { id: "composter_side.png", rgb: [119, 76, 38], name: "Composter Side" },
  { id: "copper_block.png", rgb: [194, 109, 82], name: "Copper Block" },
  { id: "copper_bulb.png", rgb: [164, 92, 65], name: "Copper Bulb" },
  { id: "copper_bulb_lit.png", rgb: [220, 165, 121], name: "Copper Bulb Lit" },
  { id: "copper_ore.png", rgb: [130, 127, 122], name: "Copper Ore" },
  { id: "crafter_bottom.png", rgb: [80, 80, 80], name: "Crafter Bottom" },
  { id: "crafter_north.png", rgb: [121, 115, 109], name: "Crafter North" },
  { id: "crafter_south.png", rgb: [130, 119, 105], name: "Crafter South" },
  { id: "crafter_top.png", rgb: [119, 114, 114], name: "Crafter Top" },
  { id: "crafter_top_crafting.png", rgb: [145, 115, 115], name: "Crafter Top Crafting" },
  { id: "crafting_table_side.png", rgb: [145, 118, 75], name: "Crafting Table Side" },
  { id: "crafting_table_top.png", rgb: [134, 83, 48], name: "Crafting Table Top" },
  { id: "creaking_heart.png", rgb: [86, 73, 69], name: "Creaking Heart" },
  { id: "creaking_heart_active.png", rgb: [160, 90, 59], name: "Creaking Heart Active" },
  { id: "creaking_heart_top.png", rgb: [76, 63, 59], name: "Creaking Heart Top" },
  { id: "creaking_heart_top_active.png", rgb: [166, 90, 52], name: "Creaking Heart Top Active" },
  { id: "crimson_nylium.png", rgb: [133, 38, 38], name: "Crimson Nylium" },
  { id: "crimson_nylium_side.png", rgb: [112, 32, 32], name: "Crimson Nylium Side" },
  { id: "crimson_planks.png", rgb: [105, 50, 73], name: "Crimson Planks" },
  { id: "crimson_stem.png", rgb: [98, 28, 36], name: "Crimson Stem" },
  { id: "crying_obsidian.png", rgb: [49, 13, 92], name: "Crying Obsidian" },
  { id: "cut_copper.png", rgb: [193, 109, 83], name: "Cut Copper" },
  { id: "cut_red_sandstone.png", rgb: [190, 103, 33], name: "Cut Red Sandstone" },
  { id: "cut_sandstone.png", rgb: [218, 207, 162], name: "Cut Sandstone" },
  { id: "cyan_concrete.png", rgb: [21, 119, 136], name: "Cyan Concrete" },
  { id: "cyan_concrete_powder.png", rgb: [37, 149, 157], name: "Cyan Concrete Powder" },
  { id: "cyan_glazed_terracotta.png", rgb: [79, 130, 136], name: "Cyan Glazed Terracotta" },
  { id: "cyan_shulker_box.png", rgb: [20, 123, 136], name: "Cyan Shulker Box" },
  { id: "cyan_terracotta.png", rgb: [87, 91, 91], name: "Cyan Terracotta" },
  { id: "cyan_wool.png", rgb: [21, 138, 145], name: "Cyan Wool" },
  { id: "dark_oak_log.png", rgb: [62, 47, 27], name: "Dark Oak Log" },
  { id: "dark_oak_planks.png", rgb: [68, 44, 21], name: "Dark Oak Planks" },
  { id: "dark_oak_trapdoor.png", rgb: [78, 51, 24], name: "Dark Oak Trapdoor" },
  { id: "dark_prismarine.png", rgb: [53, 95, 78], name: "Dark Prismarine" },
  { id: "daylight_detector_inverted_top.png", rgb: [121, 129, 140], name: "Daylight Detector Inverted Top" },
  { id: "daylight_detector_side.png", rgb: [68, 56, 36], name: "Daylight Detector Side" },
  { id: "daylight_detector_top.png", rgb: [151, 137, 119], name: "Daylight Detector Top" },
  { id: "dead_brain_coral_block.png", rgb: [127, 120, 116], name: "Dead Brain Coral Block" },
  { id: "dead_bubble_coral_block.png", rgb: [133, 125, 121], name: "Dead Bubble Coral Block" },
  { id: "dead_fire_coral_block.png", rgb: [133, 126, 121], name: "Dead Fire Coral Block" },
  { id: "dead_horn_coral_block.png", rgb: [136, 129, 125], name: "Dead Horn Coral Block" },
  { id: "dead_tube_coral_block.png", rgb: [133, 125, 122], name: "Dead Tube Coral Block" },
  { id: "deepslate.png", rgb: [83, 83, 85], name: "Deepslate" },
  { id: "deepslate_bricks.png", rgb: [75, 75, 75], name: "Deepslate Bricks" },
  { id: "deepslate_coal_ore.png", rgb: [81, 81, 82], name: "Deepslate Coal Ore" },
  { id: "deepslate_copper_ore.png", rgb: [102, 99, 93], name: "Deepslate Copper Ore" },
  { id: "deepslate_diamond_ore.png", rgb: [91, 120, 119], name: "Deepslate Diamond Ore" },
  { id: "deepslate_emerald_ore.png", rgb: [90, 120, 97], name: "Deepslate Emerald Ore" },
  { id: "deepslate_gold_ore.png", rgb: [133, 115, 86], name: "Deepslate Gold Ore" },
  { id: "deepslate_iron_ore.png", rgb: [118, 106, 99], name: "Deepslate Iron Ore" },
  { id: "deepslate_lapis_ore.png", rgb: [87, 95, 128], name: "Deepslate Lapis Ore" },
  { id: "deepslate_redstone_ore.png", rgb: [121, 81, 82], name: "Deepslate Redstone Ore" },
  { id: "deepslate_tiles.png", rgb: [57, 57, 57], name: "Deepslate Tiles" },
  { id: "deepslate_top.png", rgb: [89, 89, 91], name: "Deepslate Top" },
  { id: "diamond_block.png", rgb: [113, 238, 229], name: "Diamond Block" },
  { id: "diamond_ore.png", rgb: [126, 147, 146], name: "Diamond Ore" },
  { id: "diorite.png", rgb: [193, 193, 193], name: "Diorite" },
  { id: "dirt.png", rgb: [138, 99, 70], name: "Dirt" },
  { id: "dirt_path_top.png", rgb: [149, 122, 65], name: "Dirt Path Top" },
  { id: "dispenser_front.png", rgb: [133, 132, 132], name: "Dispenser Front" },
  { id: "dried_kelp_side.png", rgb: [48, 56, 39], name: "Dried Kelp Side" },
  { id: "dripstone_block.png", rgb: [136, 110, 94], name: "Dripstone Block" },
  { id: "emerald_block.png", rgb: [57, 206, 99], name: "Emerald Block" },
  { id: "emerald_ore.png", rgb: [118, 143, 122], name: "Emerald Ore" },
  { id: "end_stone.png", rgb: [220, 224, 159], name: "End Stone" },
  { id: "end_stone_bricks.png", rgb: [220, 226, 164], name: "End Stone Bricks" },
  { id: "exposed_chiseled_copper.png", rgb: [158, 120, 102], name: "Exposed Chiseled Copper" },
  { id: "exposed_copper.png", rgb: [164, 126, 105], name: "Exposed Copper" },
  { id: "exposed_copper_bulb.png", rgb: [142, 110, 93], name: "Exposed Copper Bulb" },
  { id: "exposed_copper_bulb_lit.png", rgb: [201, 151, 108], name: "Exposed Copper Bulb Lit" },
  { id: "exposed_cut_copper.png", rgb: [158, 123, 103], name: "Exposed Cut Copper" },
  { id: "farmland.png", rgb: [147, 106, 73], name: "Farmland" },
  { id: "farmland_moist.png", rgb: [85, 47, 19], name: "Moist Farmland" },
  { id: "fire_coral_block.png", rgb: [167, 36, 47], name: "Fire Coral Block" },
  { id: "flowering_azalea_top.png", rgb: [117, 124, 85], name: "Flowering Azalea Top" },
  { id: "furnace_front.png", rgb: [109, 108, 108], name: "Furnace Front" },
  { id: "furnace_side.png", rgb: [128, 127, 127], name: "Furnace Side" },
  { id: "furnace_top.png", rgb: [114, 114, 114], name: "Furnace Top" },
  { id: "gilded_blackstone.png", rgb: [72, 56, 44], name: "Gilded Blackstone" },
  { id: "glowstone.png", rgb: [184, 151, 111], name: "Glowstone" },
  { id: "gold_block.png", rgb: [247, 211, 69], name: "Gold Block" },
  { id: "gold_ore.png", rgb: [153, 139, 116], name: "Gold Ore" },
  { id: "granite.png", rgb: [152, 106, 89], name: "Granite" },
  { id: "grass_block_snow.png", rgb: [181, 173, 165], name: "Snowy Grass Block" },
  { id: "gravel.png", rgb: [133, 129, 128], name: "Gravel" },
  { id: "gray_concrete.png", rgb: [55, 58, 62], name: "Gray Concrete" },
  { id: "gray_concrete_powder.png", rgb: [77, 81, 85], name: "Gray Concrete Powder" },
  { id: "gray_glazed_terracotta.png", rgb: [91, 98, 100], name: "Gray Glazed Terracotta" },
  { id: "gray_shulker_box.png", rgb: [56, 59, 63], name: "Gray Shulker Box" },
  { id: "gray_terracotta.png", rgb: [58, 42, 36], name: "Gray Terracotta" },
  { id: "gray_wool.png", rgb: [63, 69, 72], name: "Gray Wool" },
  { id: "green_concrete.png", rgb: [73, 91, 36], name: "Green Concrete" },
  { id: "green_concrete_powder.png", rgb: [97, 120, 45], name: "Green Concrete Powder" },
  { id: "green_glazed_terracotta.png", rgb: [127, 149, 100], name: "Green Glazed Terracotta" },
  { id: "green_shulker_box.png", rgb: [79, 101, 32], name: "Green Shulker Box" },
  { id: "green_terracotta.png", rgb: [76, 83, 42], name: "Green Terracotta" },
  { id: "green_wool.png", rgb: [85, 110, 28], name: "Green Wool" },
  { id: "hay_block_side.png", rgb: [168, 141, 39], name: "Hay Block Side" },
  { id: "hay_block_top.png", rgb: [167, 141, 13], name: "Hay Block Top" },
  { id: "honeycomb_block.png", rgb: [231, 155, 51], name: "Honeycomb Block" },
  { id: "horn_coral_block.png", rgb: [217, 203, 67], name: "Horn Coral Block" },
  { id: "iron_block.png", rgb: [221, 221, 221], name: "Iron Block" },
  { id: "iron_ore.png", rgb: [140, 131, 125], name: "Iron Ore" },
  { id: "jack_o_lantern.png", rgb: [219, 164, 73], name: "Jack O'Lantern" },
  { id: "jungle_log.png", rgb: [87, 69, 26], name: "Jungle Log" },
  { id: "jungle_planks.png", rgb: [164, 118, 84], name: "Jungle Planks" },
  { id: "lapis_block.png", rgb: [31, 69, 141], name: "Lapis Block" },
  { id: "lapis_ore.png", rgb: [116, 122, 147], name: "Lapis Ore" },
  { id: "light_blue_concrete.png", rgb: [36, 137, 199], name: "Light Blue Concrete" },
  { id: "light_blue_concrete_powder.png", rgb: [75, 181, 214], name: "Light Blue Concrete Powder" },
  { id: "light_blue_glazed_terracotta.png", rgb: [129, 180, 213], name: "Light Blue Glazed Terracotta" },
  { id: "light_blue_shulker_box.png", rgb: [50, 165, 212], name: "Light Blue Shulker Box" },
  { id: "light_blue_terracotta.png", rgb: [114, 109, 138], name: "Light Blue Terracotta" },
  { id: "light_blue_wool.png", rgb: [60, 176, 218], name: "Light Blue Wool" },
  { id: "light_gray_concrete.png", rgb: [125, 125, 115], name: "Light Gray Concrete" },
  { id: "light_gray_concrete_powder.png", rgb: [155, 155, 149], name: "Light Gray Concrete Powder" },
  { id: "light_gray_glazed_terracotta.png", rgb: [160, 172, 174], name: "Light Gray Glazed Terracotta" },
  { id: "light_gray_shulker_box.png", rgb: [126, 126, 117], name: "Light Gray Shulker Box" },
  { id: "light_gray_terracotta.png", rgb: [135, 107, 98], name: "Light Gray Terracotta" },
  { id: "light_gray_wool.png", rgb: [142, 143, 135], name: "Light Gray Wool" },
  { id: "lime_concrete.png", rgb: [94, 169, 25], name: "Lime Concrete" },
  { id: "lime_concrete_powder.png", rgb: [126, 190, 42], name: "Lime Concrete Powder" },
  { id: "lime_glazed_terracotta.png", rgb: [177, 200, 79], name: "Lime Glazed Terracotta" },
  { id: "lime_shulker_box.png", rgb: [101, 174, 23], name: "Lime Shulker Box" },
  { id: "lime_terracotta.png", rgb: [104, 118, 53], name: "Lime Terracotta" },
  { id: "lime_wool.png", rgb: [113, 186, 26], name: "Lime Wool" },
  { id: "lodestone_side.png", rgb: [125, 126, 129], name: "Lodestone Side" },
  { id: "lodestone_top.png", rgb: [149, 152, 156], name: "Lodestone Top" },
  { id: "loom_bottom.png", rgb: [79, 62, 37], name: "Loom Bottom" },
  { id: "loom_side.png", rgb: [151, 109, 76], name: "Loom Side" },
  { id: "loom_top.png", rgb: [154, 131, 108], name: "Loom Top" },
  { id: "magenta_concrete.png", rgb: [169, 48, 159], name: "Magenta Concrete" },
  { id: "magenta_concrete_powder.png", rgb: [193, 85, 185], name: "Magenta Concrete Powder" },
  { id: "magenta_glazed_terracotta.png", rgb: [210, 112, 193], name: "Magenta Glazed Terracotta" },
  { id: "magenta_shulker_box.png", rgb: [175, 55, 164], name: "Magenta Shulker Box" },
  { id: "magenta_terracotta.png", rgb: [150, 88, 109], name: "Magenta Terracotta" },
  { id: "magenta_wool.png", rgb: [190, 70, 181], name: "Magenta Wool" },
  { id: "magma.png", rgb: [162, 77, 34], name: "Magma Block" },
  { id: "mangrove_log.png", rgb: [85, 68, 41], name: "Mangrove Log" },
  { id: "mangrove_planks.png", rgb: [119, 56, 50], name: "Mangrove Planks" },
  { id: "melon_side.png", rgb: [124, 148, 30], name: "Melon Side" },
  { id: "melon_top.png", rgb: [120, 147, 31], name: "Melon Top" },
  { id: "moss_block.png", rgb: [91, 111, 46], name: "Moss Block" },
  { id: "mossy_cobblestone.png", rgb: [114, 121, 103], name: "Mossy Cobblestone" },
  { id: "mossy_stone_bricks.png", rgb: [118, 123, 110], name: "Mossy Stone Bricks" },
  { id: "mud.png", rgb: [61, 58, 61], name: "Mud" },
  { id: "mud_bricks.png", rgb: [139, 105, 80], name: "Mud Bricks" },
  { id: "muddy_mangrove_roots_side.png", rgb: [70, 59, 50], name: "Muddy Mangrove Roots Side" },
  { id: "mushroom_block_inside.png", rgb: [202, 170, 120], name: "Mushroom Block Inside" },
  { id: "mushroom_stem.png", rgb: [203, 197, 186], name: "Mushroom Stem" },
  { id: "mycelium_side.png", rgb: [119, 92, 78], name: "Mycelium Side" },
  { id: "mycelium_top.png", rgb: [112, 99, 102], name: "Mycelium Top" },
  { id: "nether_bricks.png", rgb: [46, 23, 27], name: "Nether Bricks" },
  { id: "nether_gold_ore.png", rgb: [127, 78, 48], name: "Nether Gold Ore" },
  { id: "nether_quartz_ore.png", rgb: [127, 90, 84], name: "Nether Quartz Ore" },
  { id: "nether_wart_block.png", rgb: [117, 4, 3], name: "Nether Wart Block" },
  { id: "netherite_block.png", rgb: [68, 64, 66], name: "Netherite Block" },
  { id: "netherrack.png", rgb: [99, 40, 40], name: "Netherrack" },
  { id: "note_block.png", rgb: [98, 63, 44], name: "Note Block" },
  { id: "oak_log.png", rgb: [113, 88, 52], name: "Oak Log" },
  { id: "oak_planks.png", rgb: [165, 134, 81], name: "Oak Planks" },
  { id: "observer_side.png", rgb: [76, 75, 75], name: "Observer Side" },
  { id: "observer_top.png", rgb: [107, 107, 107], name: "Observer Top" },
  { id: "obsidian.png", rgb: [21, 14, 35], name: "Obsidian" },
  { id: "ochre_froglight_side.png", rgb: [246, 235, 189], name: "Ochre Froglight Side" },
  { id: "orange_concrete.png", rgb: [224, 97, 1], name: "Orange Concrete" },
  { id: "orange_concrete_powder.png", rgb: [227, 133, 34], name: "Orange Concrete Powder" },
  { id: "orange_glazed_terracotta.png", rgb: [193, 154, 127], name: "Orange Glazed Terracotta" },
  { id: "orange_shulker_box.png", rgb: [235, 107, 9], name: "Orange Shulker Box" },
  { id: "orange_terracotta.png", rgb: [162, 84, 38], name: "Orange Terracotta" },
  { id: "orange_wool.png", rgb: [241, 119, 22], name: "Orange Wool" },
  { id: "oxidized_chiseled_copper.png", rgb: [85, 165, 135], name: "Oxidized Chiseled Copper" },
  { id: "oxidized_copper.png", rgb: [84, 165, 135], name: "Oxidized Copper" },
  { id: "oxidized_copper_bulb.png", rgb: [73, 140, 115], name: "Oxidized Copper Bulb" },
  { id: "oxidized_copper_bulb_lit.png", rgb: [153, 158, 112], name: "Oxidized Copper Bulb Lit" },
  { id: "oxidized_cut_copper.png", rgb: [82, 157, 129], name: "Oxidized Cut Copper" },
  { id: "packed_ice.png", rgb: [143, 180, 251], name: "Packed Ice" },
  { id: "packed_mud.png", rgb: [143, 107, 80], name: "Packed Mud" },
  { id: "pale_moss_block.png", rgb: [108, 114, 106], name: "Pale Moss Block" },
  { id: "pale_oak_log.png", rgb: [90, 80, 77], name: "Pale Oak Log" },
  { id: "pale_oak_planks.png", rgb: [229, 219, 218], name: "Pale Oak Planks" },
  { id: "pale_oak_trapdoor.png", rgb: [233, 223, 222], name: "Pale Oak Trapdoor" },
  { id: "pearlescent_froglight_side.png", rgb: [237, 228, 230], name: "Pearlescent Froglight Side" },
  { id: "pink_concrete.png", rgb: [214, 101, 143], name: "Pink Concrete" },
  { id: "pink_concrete_powder.png", rgb: [229, 155, 182], name: "Pink Concrete Powder" },
  { id: "pink_glazed_terracotta.png", rgb: [236, 158, 183], name: "Pink Glazed Terracotta" },
  { id: "pink_shulker_box.png", rgb: [231, 123, 158], name: "Pink Shulker Box" },
  { id: "pink_terracotta.png", rgb: [162, 78, 79], name: "Pink Terracotta" },
  { id: "pink_wool.png", rgb: [238, 144, 173], name: "Pink Wool" },
  { id: "piston_side.png", rgb: [118, 111, 103], name: "Piston Side" },
  { id: "piston_top.png", rgb: [159, 135, 102], name: "Piston Top" },
  { id: "piston_top_sticky.png", rgb: [134, 158, 108], name: "Sticky Piston Top" },
  { id: "podzol_side.png", rgb: [128, 92, 62], name: "Podzol Side" },
  { id: "podzol_top.png", rgb: [95, 65, 24], name: "Podzol Top" },
  { id: "polished_andesite.png", rgb: [135, 137, 136], name: "Polished Andesite" },
  { id: "polished_basalt_side.png", rgb: [92, 92, 94], name: "Polished Basalt Side" },
  { id: "polished_basalt_top.png", rgb: [103, 102, 104], name: "Polished Basalt Top" },
  { id: "polished_blackstone.png", rgb: [55, 51, 60], name: "Polished Blackstone" },
  { id: "polished_blackstone_bricks.png", rgb: [51, 46, 55], name: "Polished Blackstone Bricks" },
  { id: "polished_deepslate.png", rgb: [76, 76, 76], name: "Polished Deepslate" },
  { id: "polished_diorite.png", rgb: [197, 197, 198], name: "Polished Diorite" },
  { id: "polished_granite.png", rgb: [156, 109, 92], name: "Polished Granite" },
  { id: "polished_tuff.png", rgb: [99, 105, 101], name: "Polished Tuff" },
  { id: "powder_snow.png", rgb: [248, 253, 253], name: "Powder Snow" },
  { id: "prismarine.png", rgb: [105, 163, 158], name: "Prismarine" },
  { id: "prismarine_bricks.png", rgb: [102, 173, 161], name: "Prismarine Bricks" },
  { id: "pumpkin_side.png", rgb: [199, 119, 28], name: "Pumpkin Side" },
  { id: "pumpkin_top.png", rgb: [201, 122, 29], name: "Pumpkin Top" },
  { id: "purple_concrete.png", rgb: [100, 32, 156], name: "Purple Concrete" },
  { id: "purple_concrete_powder.png", rgb: [132, 56, 178], name: "Purple Concrete Powder" },
  { id: "purple_glazed_terracotta.png", rgb: [118, 51, 165], name: "Purple Glazed Terracotta" },
  { id: "purple_shulker_box.png", rgb: [104, 33, 157], name: "Purple Shulker Box" },
  { id: "purple_terracotta.png", rgb: [118, 70, 86], name: "Purple Terracotta" },
  { id: "purple_wool.png", rgb: [123, 43, 173], name: "Purple Wool" },
  { id: "purpur_block.png", rgb: [171, 128, 171], name: "Purpur Block" },
  { id: "purpur_pillar.png", rgb: [173, 132, 173], name: "Purpur Pillar" },
  { id: "purpur_pillar_top.png", rgb: [173, 130, 172], name: "Purpur Pillar Top" },
  { id: "quartz_block_side.png", rgb: [236, 230, 223], name: "Quartz Block Side" },
  { id: "quartz_pillar.png", rgb: [236, 231, 224], name: "Quartz Pillar" },
  { id: "raw_copper_block.png", rgb: [163, 109, 83], name: "Raw Copper Block" },
  { id: "raw_gold_block.png", rgb: [224, 177, 61], name: "Raw Gold Block" },
  { id: "raw_iron_block.png", rgb: [173, 142, 116], name: "Raw Iron Block" },
  { id: "red_concrete.png", rgb: [142, 33, 33], name: "Red Concrete" },
  { id: "red_concrete_powder.png", rgb: [169, 54, 51], name: "Red Concrete Powder" },
  { id: "red_glazed_terracotta.png", rgb: [184, 67, 59], name: "Red Glazed Terracotta" },
  { id: "red_mushroom_block.png", rgb: [201, 57, 55], name: "Red Mushroom Block" },
  { id: "red_nether_bricks.png", rgb: [74, 8, 10], name: "Red Nether Bricks" },
  { id: "red_sand.png", rgb: [191, 103, 33], name: "Red Sand" },
  { id: "red_sandstone.png", rgb: [188, 100, 31], name: "Red Sandstone" },
  { id: "red_sandstone_top.png", rgb: [182, 98, 32], name: "Red Sandstone Top" },
  { id: "red_shulker_box.png", rgb: [142, 32, 30], name: "Red Shulker Box" },
  { id: "red_terracotta.png", rgb: [143, 61, 47], name: "Red Terracotta" },
  { id: "red_wool.png", rgb: [161, 40, 35], name: "Red Wool" },
  { id: "redstone_block.png", rgb: [182, 26, 5], name: "Redstone Block" },
  { id: "redstone_lamp.png", rgb: [107, 62, 33], name: "Redstone Lamp" },
  { id: "redstone_lamp_on.png", rgb: [170, 127, 82], name: "Redstone Lamp (On)" },
  { id: "redstone_ore.png", rgb: [147, 117, 117], name: "Redstone Ore" },
  { id: "reinforced_deepslate_bottom.png", rgb: [87, 92, 86], name: "Reinforced Deepslate Bottom" },
  { id: "resin_block.png", rgb: [219, 105, 30], name: "Resin Block" },
  { id: "resin_bricks.png", rgb: [208, 95, 28], name: "Resin Bricks" },
  { id: "respawn_anchor_top_off.png", rgb: [46, 30, 74], name: "Respawn Anchor Top (Off)" },
  { id: "respawn_anchor_top_on.png", rgb: [84, 33, 163], name: "Respawn Anchor Top (On)" },
  { id: "rooted_dirt.png", rgb: [148, 107, 82], name: "Rooted Dirt" },
  { id: "sand.png", rgb: [219, 208, 164], name: "Sand" },
  { id: "sandstone.png", rgb: [217, 204, 158], name: "Sandstone" },
  { id: "sandstone_top.png", rgb: [224, 214, 171], name: "Sandstone Top" },
  { id: "sculk.png", rgb: [13, 36, 42], name: "Sculk" },
  { id: "sculk_catalyst_bottom.png", rgb: [102, 119, 116], name: "Sculk Catalyst Bottom" },
  { id: "sculk_catalyst_side.png", rgb: [107, 120, 108], name: "Sculk Catalyst Side" },
  { id: "sea_lantern.png", rgb: [184, 205, 196], name: "Sea Lantern" },
  { id: "shroomlight.png", rgb: [242, 157, 93], name: "Shroomlight" },
  { id: "shulker_box.png", rgb: [140, 97, 140], name: "Shulker Box" },
  { id: "smithing_table_bottom.png", rgb: [66, 28, 24], name: "Smithing Table Bottom" },
  { id: "smithing_table_front.png", rgb: [63, 41, 44], name: "Smithing Table Front" },
  { id: "smithing_table_top.png", rgb: [58, 60, 73], name: "Smithing Table Top" },
  { id: "smoker_bottom.png", rgb: [111, 109, 109], name: "Smoker Bottom" },
  { id: "smoker_side.png", rgb: [107, 97, 86], name: "Smoker Side" },
  { id: "smoker_top.png", rgb: [93, 91, 90], name: "Smoker Top" },
  { id: "smooth_basalt.png", rgb: [75, 75, 79], name: "Smooth Basalt" },
  { id: "smooth_stone.png", rgb: [160, 160, 160], name: "Smooth Stone" },
  { id: "smooth_stone_slab_side.png", rgb: [169, 169, 169], name: "Smooth Stone Slab Side" },
  { id: "snow.png", rgb: [249, 254, 254], name: "Snow" },
  { id: "soul_sand.png", rgb: [84, 64, 53], name: "Soul Sand" },
  { id: "soul_soil.png", rgb: [78, 59, 48], name: "Soul Soil" },
  { id: "sponge.png", rgb: [197, 194, 75], name: "Sponge" },
  { id: "spruce_log.png", rgb: [60, 39, 18], name: "Spruce Log" },
  { id: "spruce_planks.png", rgb: [117, 86, 49], name: "Spruce Planks" },
  { id: "spruce_trapdoor.png", rgb: [105, 80, 50], name: "Spruce Trapdoor" },
  { id: "stone.png", rgb: [126, 126, 126], name: "Stone" },
  { id: "stone_bricks.png", rgb: [124, 124, 124], name: "Stone Bricks" },
  { id: "stonecutter_bottom.png", rgb: [120, 120, 120], name: "Stonecutter Bottom" },
  { id: "stripped_acacia_log.png", rgb: [175, 93, 60], name: "Stripped Acacia Log" },
  { id: "stripped_acacia_log_top.png", rgb: [167, 91, 52], name: "Stripped Acacia Log Top" },
  { id: "stripped_bamboo_block.png", rgb: [196, 175, 82], name: "Stripped Bamboo Block" },
  { id: "stripped_bamboo_block_top.png", rgb: [184, 164, 77], name: "Stripped Bamboo Block Top" },
  { id: "stripped_birch_log.png", rgb: [197, 177, 119], name: "Stripped Birch Log" },
  { id: "stripped_birch_log_top.png", rgb: [192, 173, 118], name: "Stripped Birch Log Top" },
  { id: "stripped_cherry_log.png", rgb: [215, 145, 149], name: "Stripped Cherry Log" },
  { id: "stripped_cherry_log_top.png", rgb: [221, 167, 160], name: "Stripped Cherry Log Top" },
  { id: "stripped_crimson_stem.png", rgb: [138, 58, 90], name: "Stripped Crimson Stem" },
  { id: "stripped_crimson_stem_top.png", rgb: [123, 57, 83], name: "Stripped Crimson Stem Top" },
  { id: "stripped_dark_oak_log.png", rgb: [73, 57, 36], name: "Stripped Dark Oak Log" },
  { id: "stripped_dark_oak_log_top.png", rgb: [67, 45, 23], name: "Stripped Dark Oak Log Top" },
  { id: "stripped_jungle_log.png", rgb: [172, 133, 85], name: "Stripped Jungle Log" },
  { id: "stripped_jungle_log_top.png", rgb: [166, 124, 83], name: "Stripped Jungle Log Top" },
  { id: "stripped_mangrove_log.png", rgb: [120, 55, 48], name: "Stripped Mangrove Log" },
  { id: "stripped_mangrove_log_top.png", rgb: [110, 45, 44], name: "Stripped Mangrove Log Top" },
  { id: "stripped_oak_log.png", rgb: [178, 145, 87], name: "Stripped Oak Log" },
  { id: "stripped_oak_log_top.png", rgb: [162, 131, 79], name: "Stripped Oak Log Top" },
  { id: "stripped_pale_oak_log.png", rgb: [246, 238, 237], name: "Stripped Pale Oak Log" },
  { id: "stripped_pale_oak_log_top.png", rgb: [236, 228, 227], name: "Stripped Pale Oak Log Top" },
  { id: "stripped_spruce_log.png", rgb: [116, 90, 53], name: "Stripped Spruce Log" },
  { id: "stripped_spruce_log_top.png", rgb: [109, 82, 48], name: "Stripped Spruce Log Top" },
  { id: "stripped_warped_stem.png", rgb: [58, 151, 148], name: "Stripped Warped Stem" },
  { id: "stripped_warped_stem_top.png", rgb: [53, 131, 127], name: "Stripped Warped Stem Top" },
  { id: "target_top.png", rgb: [228, 193, 178], name: "Target Top" },
  { id: "terracotta.png", rgb: [152, 94, 68], name: "Terracotta" },
  { id: "tnt_bottom.png", rgb: [171, 83, 77], name: "TNT Bottom" },
  { id: "tnt_side.png", rgb: [191, 124, 123], name: "TNT Side" },
  { id: "tube_coral_block.png", rgb: [51, 90, 209], name: "Tube Coral Block" },
  { id: "tuff.png", rgb: [111, 111, 105], name: "Tuff" },
  { id: "tuff_bricks.png", rgb: [102, 105, 98], name: "Tuff Bricks" },
  { id: "verdant_froglight_side.png", rgb: [215, 236, 213], name: "Verdant Froglight Side" },
  { id: "warped_nylium.png", rgb: [51, 117, 104], name: "Warped Nylium" },
  { id: "warped_nylium_side.png", rgb: [81, 76, 71], name: "Warped Nylium Side" },
  { id: "warped_planks.png", rgb: [45, 109, 104], name: "Warped Planks" },
  { id: "warped_stem.png", rgb: [63, 68, 81], name: "Warped Stem" },
  { id: "warped_wart_block.png", rgb: [23, 122, 122], name: "Warped Wart Block" },
  { id: "weathered_chiseled_copper.png", rgb: [106, 154, 115], name: "Weathered Chiseled Copper" },
  { id: "weathered_copper.png", rgb: [109, 155, 113], name: "Weathered Copper" },
  { id: "weathered_copper_bulb.png", rgb: [95, 132, 103], name: "Weathered Copper Bulb" },
  { id: "weathered_copper_bulb_lit.png", rgb: [172, 160, 104], name: "Weathered Copper Bulb Lit" },
  { id: "weathered_cut_copper.png", rgb: [111, 148, 110], name: "Weathered Cut Copper" },
  { id: "wet_sponge.png", rgb: [173, 183, 71], name: "Wet Sponge" },
  { id: "white_concrete.png", rgb: [207, 213, 214], name: "White Concrete" },
  { id: "white_concrete_powder.png", rgb: [226, 228, 228], name: "White Concrete Powder" },
  { id: "white_glazed_terracotta.png", rgb: [213, 219, 215], name: "White Glazed Terracotta" },
  { id: "white_shulker_box.png", rgb: [216, 221, 222], name: "White Shulker Box" },
  { id: "white_terracotta.png", rgb: [210, 178, 161], name: "White Terracotta" },
  { id: "white_wool.png", rgb: [234, 237, 237], name: "White Wool" },
  { id: "yellow_concrete.png", rgb: [241, 175, 21], name: "Yellow Concrete" },
  { id: "yellow_concrete_powder.png", rgb: [233, 199, 57], name: "Yellow Concrete Powder" },
  { id: "yellow_glazed_terracotta.png", rgb: [237, 198, 113], name: "Yellow Glazed Terracotta" },
  { id: "yellow_shulker_box.png", rgb: [248, 189, 30], name: "Yellow Shulker Box" },
  { id: "yellow_terracotta.png", rgb: [186, 133, 35], name: "Yellow Terracotta" },
];

// 🔍 Cari blok terdekat berdasarkan RGB
function getClosestBlockByRgb(targetRgb: RGB) {
  let closestBlock = blocks[0];
  let smallestDistance = Infinity;

  for (const block of blocks) {
    const [r1, g1, b1] = block.rgb;
    const [r2, g2, b2] = targetRgb;

    const distance = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestBlock = block;
    }
  }

  return closestBlock;
}

// 🎨 Bikin gradasi RGB
function generateRgbGradient(start: RGB, end: RGB, steps: number): RGB[] {
  const gradient: RGB[] = [];

  for (let i = 0; i < steps; i++) {
    const r = Math.round(start[0] + ((end[0] - start[0]) * i) / (steps - 1));
    const g = Math.round(start[1] + ((end[1] - start[1]) * i) / (steps - 1));
    const b = Math.round(start[2] + ((end[2] - start[2]) * i) / (steps - 1));
    gradient.push([r, g, b] as RGB);
  }

  return gradient;
}

function EditSlider({ min, max, defaultValue = 0, step = 1, percentage = false, onChange, unit = "" }: any) {
  const [value, setValue] = React.useState(defaultValue);

  let desc = unit;
  desc = percentage ? "%" : unit;

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleRangeChange = (event: any) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const handleTextChange = (event: any) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      const numericValue = newValue === "" ? 0 : Number(newValue);
      if (numericValue >= min && numericValue <= max) {
        setValue(numericValue);
        if (onChange) onChange(numericValue);
      }
    }
  };

  let valuePercentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="edit-range">
      <div className="subedit-range">
        <div className="subedit-range-container">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleRangeChange}
            className="subedit-range-input"
            style={{
              background: `linear-gradient(to right, #5865f2 ${valuePercentage}%, #17181f ${valuePercentage}%)`,
            }}
            aria-label="Range input"
          />
        </div>
        <div className="subedit-range-desc-container">
          <span className="subedit-range-desc">{min + desc}</span>
          <span className="subedit-range-desc">{max + desc}</span>
        </div>
      </div>
      <input type="text" value={value} onChange={handleTextChange} className="subedit-text" aria-label="Text input" />
    </div>
  );
}

// 🔨 Komponen Page
export default function GradientPage() {
  const [startBlockId, setStartBlockId] = useState("packed_ice.png");
  const [endBlockId, setEndBlockId] = useState("redstone_ore.png");

  const [steps, setSteps] = useState(8);
  const [gradientResult, setGradientResult] = useState<{ id: string; rgb: RGB; name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(0);

  const filteredBlocks = blocks.filter((block) => block.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const startBlock = blocks.find((b) => b.id === startBlockId)!;
  const endBlock = blocks.find((b) => b.id === endBlockId)!;

  const handleGenerate = () => {
    const startRgb = startBlock.rgb;
    const endRgb = endBlock.rgb;

    const gradient = generateRgbGradient(startRgb, endRgb, steps);
    const closestBlocks = gradient.map((color) => {
      const closest = getClosestBlockByRgb(color);
      return {
        id: closest.id,
        rgb: closest.rgb as RGB,
        name: closest.name,
      };
    });
    setGradientResult(closestBlocks);
  };

  const rgbToHex = ([r, g, b]: RGB) =>
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

  return (
    <main className="p-8 max-w-screen-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Minecraft Block Gradient Generator</h1>

      <div className="sel-blocks-container flex flex-col">
        <div
          className="sel-blocks flex flex-row"
          style={{
            background: `linear-gradient(to right, ${rgbToHex(startBlock.rgb)} 0%, ${rgbToHex(startBlock.rgb)} 20%, ${rgbToHex(
              endBlock.rgb
            )} 80%, ${rgbToHex(endBlock.rgb)} 100%)`,
          }}
        >
          <img
            src={`/assets/${startBlock.id}`}
            alt={startBlock.name}
            onClick={() => {
              setMenuOpen(true);
              setCurrentSelected(0);
            }}
          />
          <img
            src={`/assets/${endBlock.id}`}
            alt={endBlock.name}
            onClick={() => {
              setMenuOpen(true);
              setCurrentSelected(1);
            }}
          />
        </div>
        <div className="flex justify-between">
          <button>{startBlock.name}</button>
          <button>{endBlock.name}</button>
        </div>
      </div>

      <div className="length-blocks">
        <p>Gradient chain length</p>
        <EditSlider min={2} max={32} defaultValue={steps} onChange={setSteps}/>
      </div>

      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        🚀 Generate Gradient
      </button>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {gradientResult.map((block, idx) => (
          <div key={idx} className="text-center tooltip">
            <img src={`/assets/${block.id}`} alt={block.name} style={{ width: "100px", imageRendering: "pixelated" }} />
            <span className="tooltip-text">{block.name}</span>
          </div>
        ))}
      </div>

      <div className={`menu-blocks ${menuOpen ? "shown" : ""}`}>
        <div className="menu-head flex items-center">
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded flex-1"
          />
          <img src="/ui/close.svg" className="menu-close w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
        </div>

        {filteredBlocks.map((block, index) => (
          <div key={block.id} className="menu-block sel-blocks tooltip flex flex-row">
            <img
              src={`/assets/${block.id}`}
              alt={block.name}
              onClick={() => {
                currentSelected === 0 ? setStartBlockId(block.id) : setEndBlockId(block.id);
                setMenuOpen(false);
              }}
            />
            <span className="tooltip-text">{block.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
