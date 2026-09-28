(module
 (type $0 (func (param i32 i32 i32 i32) (result i32)))
 (type $1 (func (param i32) (result i32)))
 (global $wasm/watermark/POSITION_BOTTOM_RIGHT i32 (i32.const 0))
 (global $wasm/watermark/POSITION_BOTTOM_LEFT i32 (i32.const 1))
 (global $wasm/watermark/POSITION_TOP_RIGHT i32 (i32.const 2))
 (global $wasm/watermark/POSITION_TOP_LEFT i32 (i32.const 3))
 (global $wasm/watermark/POSITION_CENTER i32 (i32.const 4))
 (memory $0 0)
 (export "POSITION_BOTTOM_RIGHT" (global $wasm/watermark/POSITION_BOTTOM_RIGHT))
 (export "POSITION_BOTTOM_LEFT" (global $wasm/watermark/POSITION_BOTTOM_LEFT))
 (export "POSITION_TOP_RIGHT" (global $wasm/watermark/POSITION_TOP_RIGHT))
 (export "POSITION_TOP_LEFT" (global $wasm/watermark/POSITION_TOP_LEFT))
 (export "POSITION_CENTER" (global $wasm/watermark/POSITION_CENTER))
 (export "clampOpacity" (func $wasm/watermark/clampOpacity))
 (export "computeX" (func $wasm/watermark/computeX))
 (export "computeY" (func $wasm/watermark/computeY))
 (export "memory" (memory $0))
 (func $wasm/watermark/computeY (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.set $2
  local.get $3
  i32.const 2
  i32.eq
  local.get $3
  i32.const 3
  i32.eq
  i32.or
  if
   local.get $2
   return
  end
  local.get $3
  i32.const 4
  i32.eq
  if
   local.get $0
   local.get $1
   i32.sub
   i32.const 2
   i32.div_s
   return
  end
  local.get $0
  local.get $1
  i32.sub
  local.get $2
  i32.sub
 )
 (func $wasm/watermark/computeX (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  local.get $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.set $2
  local.get $3
  i32.const 3
  i32.eq
  local.get $3
  i32.const 1
  i32.eq
  i32.or
  if
   local.get $2
   return
  end
  local.get $3
  i32.const 4
  i32.eq
  if
   local.get $0
   local.get $1
   i32.sub
   i32.const 2
   i32.div_s
   return
  end
  local.get $0
  local.get $1
  i32.sub
  local.get $2
  i32.sub
 )
 (func $wasm/watermark/clampOpacity (param $0 i32) (result i32)
  local.get $0
  i32.const 0
  i32.lt_s
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 255
  i32.gt_s
  if
   i32.const 255
   return
  end
  local.get $0
 )
)
