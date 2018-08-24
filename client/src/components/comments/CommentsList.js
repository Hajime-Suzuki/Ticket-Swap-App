import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { formatDate } from '../../lib/formatDateString'
import { deleteComment, updateComment } from '../../store/actions/comments'
import { spacing } from '../../styles/styleConstants'
import CommentForm from './CommentForm'

const StyledPaper = styled(Paper)`
  padding: ${spacing.padding.wider} 1em;
  margin: 30px 10px;
  .space {
    margin: 10px 0;
  }
  .date {
    margin-top: 10px;
  }
  .icon-button {
    margin: 10px 10px 0;
    width: 40px;
    height: 40px;
  }
  .icon {
    color: white;
  }
`

class CommentsList extends PureComponent {
  state = {
    showEdit: false,
    commentData: {},
    commentId: null
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateComment(this.state.commentData, this.state.commentId)
    this.toggleEditForm()
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      commentData: {
        ...this.state.commentData,
        [name]: value
      }
    })
  }

  deleteComment = commentId => {
    this.props.deleteComment(commentId)
  }

  toggleEditForm = id => {
    if (id === this.state.commentId) {
      return this.setState({ showEdit: false, commentId: null })
    }
    this.setState({ showEdit: true, commentId: id })
  }

  render() {
    const { ticket, margin, currentUser } = this.props
    return (
      <div style={{ marginTop: margin }}>
        <Typography variant="display1">comments</Typography>
        <Grid container justify="center" direction="row">
          {ticket.comments.map(comment => {
            return (
              <Grid item xs={11} md={9} lg={4} key={comment.id}>
                <StyledPaper>
                  <Typography
                    color="primary"
                    children={`${comment.user.firstName} ${
                      comment.user.lastName
                    }`}
                  />
                  <Divider className="space" />
                  <Typography children={comment.content} />
                  <Typography variant="caption" className="date">
                    {formatDate(comment.createdAt)}
                  </Typography>
                  {currentUser && currentUser.admin ? (
                    <Button
                      className="icon-button"
                      variant="fab"
                      color="secondary"
                      onClick={() => this.deleteComment(comment.id)}
                    >
                      <Icon className="icon">delete_forever</Icon>
                    </Button>
                  ) : null}
                  {(currentUser && currentUser.admin) ||
                  (currentUser && currentUser.id === comment.id) ? (
                    <Button
                      variant="fab"
                      color="secondary"
                      className="icon-button"
                      onClick={() => this.toggleEditForm(comment.id)}
                    >
                      <Icon className="icon">edit_icon</Icon>
                    </Button>
                  ) : null}
                  {this.state.showEdit &&
                  this.state.commentId === comment.id ? (
                    <CommentForm
                      initial={comment}
                      content={this.state.commentData.content}
                      handleChange={this.handleChange}
                      handleSubmit={this.handleSubmit}
                      margin={spacing.normal}
                    />
                  ) : null}
                </StyledPaper>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}
export default connect(
  null,
  { updateComment, deleteComment }
)(CommentsList)
