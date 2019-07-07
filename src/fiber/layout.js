import Yoga from 'yoga-layout-prebuilt';
import widestLine from 'widest-line';
import _ from 'lodash';
import solveClass from '../shared/solveClass';

function measureText(text) {
  const width = widestLine(text);
  const height = text.split('\n').length;
  return {width, height};
}

function applyPaddingStyles(yogaNode, props) {
  if (props.padding) {
    if (typeof props.padding === 'object') {
      yogaNode.setPadding(Yoga.EDGE_TOP, props.padding.top);
      yogaNode.setPadding(Yoga.EDGE_LEFT, props.padding.left);
      yogaNode.setPadding(Yoga.EDGE_BOTTOM, props.padding.bottom);
      yogaNode.setPadding(Yoga.EDGE_RIGHT, props.padding.right);
    } else {
      yogaNode.setPadding(Yoga.EDGE_TOP, props.padding);
      yogaNode.setPadding(Yoga.EDGE_LEFT, props.padding);
      yogaNode.setPadding(Yoga.EDGE_BOTTOM, props.padding);
      yogaNode.setPadding(Yoga.EDGE_RIGHT, props.padding);
    }
  }
}

function applyPositionStyles(yogaNode, props) {
  // Absolute position overrides relative position traits
  if (props.atop || props.aleft || props.abottom || props.aright) {
    yogaNode.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE);
    props.atop && yogaNode.setPosition(Yoga.EDGE_TOP, props.atop);
    props.aleft && yogaNode.setPosition(Yoga.EDGE_LEFT, props.aleft);
    props.abottom && yogaNode.setPosition(Yoga.EDGE_BOTTOM, props.abottom);
    props.aright && yogaNode.setPosition(Yoga.EDGE_RIGHT, props.aright);
  } else {
    yogaNode.setPositionType(Yoga.POSITION_TYPE_RELATIVE);
    props.top && yogaNode.setPosition(Yoga.EDGE_TOP, props.top);
    props.left && yogaNode.setPosition(Yoga.EDGE_LEFT, props.left);
    props.bottom && yogaNode.setPosition(Yoga.EDGE_BOTTOM, props.bottom);
    props.right && yogaNode.setPosition(Yoga.EDGE_RIGHT, props.right);  
  }
}

function applyDimensionStyles(yogaNode, props) {
  props.width && yogaNode.setWidth(props.width);
  props.height && yogaNode.setHeight(props.height);
}

function applyAlignmentStyles(yogaNode, props) {
  if (props.align) {
    if (props.align == 'left') {
      yogaNode.setAlignContent(Yoga.ALIGN_FLEX_START);
    } else if (props.align == 'center') {
      yogaNode.setAlignContent(Yoga.CENTER);
    } else if (props.align == 'right') {
      yogaNode.setAlignContent(Yoga.ALIGN_FLEX_END);
    }
  }

  // TODO(shaheen) figure out valign
}

function applyFlexStyles(yogaNode, props) {
  if (props.shrink) {
    yogaNode.setFlex(props.shrink);
  }

  const style = props.style;

  if (style) {
    if (style.display == 'flex') {
      yogaNode.setFlex(1);
    }

    var direction = null;
    var wrap = null;

    const flex_flow = style['flex-flow'];
    if (flex_flow) {
      [direction, wrap] = _.split(flex_flow, new RegExp('\\s+'));
    }

    if (style['flex-direction']) {
      direction = style['flex-direction'];
    }

    if (style['flex-wrap']) {
      wrap = style['flex-wrap'];
    }

    if (direction == 'row') {
      yogaNode.setFlexDirection();
    } else if (direction == 'row-reverse') {
      yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_ROW_REVERSE);
    } else if (direction == 'column') {
      yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN);
    } else if (direction == 'column-reverse') {
      yogaNode.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN_REVERSE);
    }

    if (wrap == 'nowrap') {
      yogaNode.setFlexWrap(Yoga.WRAP_NOWRAP);
    } else if (wrap == 'wrap') {
      yogaNode.setFlexWrap(Yoga.WRAP_WRAP);
    } else if (wrap == 'wrap-reverse') {
      yogaNode.setFlexWrap(Yoga.WRAP_WRAP_REVERSE);
    }

    if (style.order) {
      yogaNode.setFlexOrder(style.order);
    }

    const justify_content = style['justify-content'];
    if (justify_content == 'flex-start') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_FLEX_START);
    } else if (justify_content == 'flex-end') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_FLEX_END);
    } else if (justify_content == 'center') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_CENTER);
    } else if (justify_content == 'space-between') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_BETWEEN);
    } else if (justify_content == 'space-around') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_AROUND);
    } else if (justify_content == 'space-evenly') {
      yogaNode.setJustifyContent(Yoga.JUSTIFY_SPACE_EVENLY);
    }

    const align_items = style['align-items'];
    if (align_items == 'flex-start') {
      yogaNode.setAlignItems(Yoga.ALIGN_FLEX_START);
    } else if (align_items == 'flex-end') {
      yogaNode.setAlignItems(Yoga.ALIGN_FLEX_END);
    } else if (align_items == 'center') {
      yogaNode.setAlignItems(Yoga.ALIGN_CENTER);
    } else if (align_items == 'baseline') {
      yogaNode.setAlignItems(Yoga.ALIGN_BASELINE);
    } else if (align_items == 'stretch') {
      yogaNode.setAlignItems(Yoga.ALIGN_STRETCH);
    }

    const align_self = style['align-self'];
    if (align_self == 'flex-start') {
      yogaNode.setAlignSelf(Yoga.ALIGN_FLEX_START);
    } else if (align_self == 'flex-end') {
      yogaNode.setAlignSelf(Yoga.ALIGN_FLEX_END);
    } else if (align_self == 'center') {
      yogaNode.setAlignSelf(Yoga.ALIGN_CENTER);
    } else if (align_self == 'baseline') {
      yogaNode.setAlignSelf(Yoga.ALIGN_BASELINE);
    } else if (align_self == 'stretch') {
      yogaNode.setAlignSelf(Yoga.ALIGN_STRETCH);
    }

    const align_content = style['justify-content'];
    if (align_content == 'flex-start') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_FLEX_START);
    } else if (align_content == 'flex-end') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_FLEX_END);
    } else if (align_content == 'center') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_CENTER);
    } else if (align_content == 'space-between') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_SPACE_BETWEEN);
    } else if (align_content == 'space-around') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_SPACE_AROUND);
    } else if (align_content == 'space-evenly') {
      yogaNode.setAlignContent(Yoga.JUSTIFY_SPACE_EVENLY);
    }

    const flex_grow = style['flex-grow'];
    if (flex_grow) {
      yogaNode.setFlexGrow(flex_grow);
    }

    const flex_shrink = style['flex-shrink'];
    if (flex_shrink) {
      yogaNode.setFlexShrink(flex_shrink);
    }

    const flex_basis = style['flex-basis'];
    if (flex_basis) {
      yogaNode.setFlexBasis(flex_basis);
    }
  }
}

function applyStylesFromProps(yogaNode, props) {
  applyPaddingStyles(yogaNode, props);
  applyPositionStyles(yogaNode, props);
  applyDimensionStyles(yogaNode, props);
  applyAlignmentStyles(yogaNode, props);
  applyFlexStyles(yogaNode, props);
  props.hidden && yogaNode.setDisplay(props.hidden ? false : true);
}

function buildLayoutHelper(yogaConfig, instance) {
  const yogaNode = Yoga.Node.create(yogaConfig);

  if (instance.props) {
    const props = solveClass(instance.props);
    applyStylesFromProps(yogaNode, props);
  }

  if (instance.children) {
    for (const [index, child] of Object.entries(instance.children)) {
      const childYogaNode = buildLayoutHelper(yogaConfig, child);
      yogaNode.insertChild(childYogaNode, index);
    }
  }

  if (instance.content) {
    const {width, height} = measureText(instance.content);
    yogaNode.setWidth(width);
    yogaNode.setHeight(height);
  }

  instance.yogaNode = yogaNode;
  return yogaNode;
}

function dumpLayout(instance, indent) {
  const info = _.repeat(' ', indent * 2) +
    '+-' + instance.toString() +
    ' [' + instance.yogaNode.getComputedWidth() +
    ', ' + instance.yogaNode.getComputedHeight() + ']';
  console.log(info);

  if (instance.children) {
    instance.children.forEach(child => {
      dumpLayout(child, indent+1);
    });
  }
}

function buildLayout(screen, rootInstance, yogaConfig) {
  const yogaNode = buildLayoutHelper(yogaConfig, rootInstance);
  yogaNode.setHeight(screen.height);
  yogaNode.setWidth(screen.width);
  yogaNode.calculateLayout(screen.width, screen.height, Yoga.DIRECTION_LTR);
}

export default buildLayout;
